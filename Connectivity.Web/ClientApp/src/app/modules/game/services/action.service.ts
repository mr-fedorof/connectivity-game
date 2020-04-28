import { Injectable } from '@angular/core';
import { GlobalAlertService } from '@modules/alert/services';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DestroyableService } from '@shared/destroyable';
import { EMPTY, from, merge, Observable, of, pipe, Subject, timer } from 'rxjs';
import {
    delayWhen,
    distinctUntilChanged,
    filter,
    map,
    mergeMap,
    share,
    switchMap,
    takeUntil,
    tap,
    withLatestFrom,
} from 'rxjs/operators';

import {
    addPendingActionStateAction,
    removePendingActionStateAction,
    shareActionsLobbyAction,
    shareLobbyAction,
    updateGlobalActionIndexActionStateAction,
} from '../actions';
import {
    actionsIncludes,
    gameActionComparator,
    isOrderedAction,
    isOriginalAction,
    isOutOfOrderAction,
    isShareAction,
} from '../helpers';
import { GameSession } from '../models';
import {
    globalActionIndexSelector,
    initializedSelector,
    isProcessingSelector,
    pendingActionsCountSelector,
    pendingActionsSelector,
} from '../selectors/action-state.selectors';
import { gameSessionSelector } from '../selectors/game-session.selectors';
import { lastActionIndexSelector, nextActionIndexSelector } from '../selectors/lobby.selectors';
import { GameHubService } from './game-hub.service';

@Injectable()
export class ActionService extends DestroyableService {
    private readonly ALLOWED_PENDING_ACTIONS_COUNT = 10;
    private readonly REQUEST_LOBBY_STATE_DELAY = 15 * 1000;
    private readonly REQUEST_LOBBY_STATE_INTERVAL = 15 * 1000;

    private readonly _originalActionsSubject: Subject<Action> = new Subject<Action>();
    private readonly _skipSelfOriginalActionsSubject: Subject<Action> = new Subject<Action>();
    private readonly _exteranlActionsSubject: Subject<Action> = new Subject<Action>();

    public readonly originalActions$: Observable<Action>;
    public readonly skipSelfOriginalActions$: Observable<Action>;
    public readonly exteranlActions$: Observable<Action>;
    public readonly pendingActions$: Observable<Action>;

    public readonly actions$: Observable<Action>;
    public readonly waitingForActions$: Observable<number>;

    constructor(
        private readonly store: Store,
        private readonly gameHubService: GameHubService,
        private readonly storeActions$: Actions,
        private readonly globalAlertService: GlobalAlertService
    ) {
        super();

        this.storeActions$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(action => {
                // tslint:disable-next-line: no-console
                console.log('action', action);
            });

        this.originalActions$ = this._originalActionsSubject.asObservable()
            .pipe(
                takeUntil(this.onDestroy),
                this.originalActionHandlingPipe,
                share()
            );

        this.exteranlActions$ = this._exteranlActionsSubject.asObservable()
            .pipe(
                takeUntil(this.onDestroy),
                this.externalActionHandlingPipe,
                share()
            );

        this.pendingActions$ = this.store.select(pendingActionsSelector)
            .pipe(
                takeUntil(this.onDestroy),
                this.delayUntilInitialized,
                tap((actions: Action[]) => {
                    // tslint:disable-next-line: no-console
                    // console.log('pendingActions$', actions);
                }),
                switchMap(actions => from(actions)),
                share()
            );

        this.actions$ = merge(this.originalActions$, this.exteranlActions$, this.pendingActions$)
            .pipe(
                takeUntil(this.onDestroy),
                this.globalActionIndexUpdatingPipe,
                this.actionsOrderingPipe,
                this.actionProcessingPipe,
                distinctUntilChanged(),
                share()
            );

        this.skipSelfOriginalActions$ = this._skipSelfOriginalActionsSubject.asObservable()
            .pipe(
                takeUntil(this.onDestroy),
                this.originalActionHandlingPipe,
                share()
            );

        this.actions$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(action => {
                this.store.dispatch(action);
            });

        this.skipSelfOriginalActions$
            .pipe(takeUntil(this.onDestroy))
            .subscribe();

        this.waitingForActions$ = this.store.select(pendingActionsCountSelector)
            .pipe(
                takeUntil(this.onDestroy),
                distinctUntilChanged(),
                share()
            );

        this.waitingForActions$
            .pipe(
                takeUntil(this.onDestroy),
                this.lobbyStateRestoringPipe
            )
            .subscribe();
    }

    public applyAction(action: Action, skipSelf?: boolean): void {
        if (!action) {
            return;
        }

        if (skipSelf) {
            this._skipSelfOriginalActionsSubject.next(action);

            return;
        }

        if (isOriginalAction(action)) {
            this._originalActionsSubject.next(action);

            return;
        }

        this._exteranlActionsSubject.next(action);
    }

    private readonly originalActionHandlingPipe = pipe(
        withLatestFrom(this.store.select(gameSessionSelector)),
        filter(([action, gameSession]: [Action, GameSession]) => !!gameSession.playerId),
        map(([action, gameSession]: [Action, GameSession]) => ({
            ...action,
            lobbyId: gameSession.lobbyId,
            playerId: gameSession.playerId
        })),
        mergeMap((action: Action) => {
            if (isShareAction(action)) {
                return this.gameHubService.sendAction(action)
                    .pipe(
                        tap(sentAction => {
                            // tslint:disable-next-line: no-console
                            // console.log('out:', sentAction);
                        })
                    );
            }

            // tslint:disable-next-line: no-console
            // console.log('sys:', action);

            return of(action);
        })
    );

    private readonly externalActionHandlingPipe = pipe(
        tap((action: Action) => {
            // tslint:disable-next-line: no-console
            // console.log('in:', action);
        })
    );

    private readonly globalActionIndexUpdatingPipe = pipe(
        withLatestFrom(this.store.select(globalActionIndexSelector)),
        tap(([action, globalActionIndex]: [Action, number]) => {
            if (isOrderedAction(action) && action.index > globalActionIndex) {
                this.store.dispatch(updateGlobalActionIndexActionStateAction(action.index));
            }
        }),
        map(([action, globalActionIndex]: [Action, number]) => action)
    );

    private readonly actionsOrderingPipe = pipe(
        withLatestFrom(
            this.store.select(nextActionIndexSelector),
            this.store.select(pendingActionsSelector)
        ),
        tap(([action, nextActionIndex, pendingActions]: [Action, number, Action[]]) => {
            if (isOrderedAction(action)) {
                if (action.index < nextActionIndex && actionsIncludes(pendingActions, action)) {
                    this.store.dispatch(removePendingActionStateAction(action));
                }

                if (action.index > nextActionIndex && !actionsIncludes(pendingActions, action)) {
                    this.store.dispatch(addPendingActionStateAction(action));
                }
            }
        }),
        filter(([action, nextActionIndex, pendingActions]: [Action, number, Action[]]) => {
            const isNextAction = isOutOfOrderAction(action) || action.index === nextActionIndex;

            return isNextAction;
        }),
        map(([action, nextActionIndex, pendingActions]: [Action, number, Action[]]) => action)
    );

    private readonly actionProcessingPipe = pipe(
        withLatestFrom(
            this.store.select(isProcessingSelector),
            this.store.select(pendingActionsSelector)
        ),
        switchMap(([action, isProcessing, pendingActions]: [Action, boolean, Action[]]) => {
            if (!isProcessing) {
                return of(action);
            }

            if (isProcessing && isOutOfOrderAction(action)) {
                return of(action);
            }

            if (!actionsIncludes(pendingActions, action)) {
                this.store.dispatch(addPendingActionStateAction(action));
            }

            return of(action)
                .pipe(this.delayUntilProcessed);
        }),
        withLatestFrom(this.store.select(pendingActionsSelector)),
        tap(([action, pendingActions]: [Action, Action[]]) => {
            if (pendingActions.find(pa => gameActionComparator(pa, action))) {
                this.store.dispatch(removePendingActionStateAction(action));
            }
        }),
        map(([action, pendingActions]: [Action, Action[]]) => action)
    );

    private readonly lobbyStateRestoringPipe = pipe(
        map((count: number) => count > this.ALLOWED_PENDING_ACTIONS_COUNT),
        distinctUntilChanged(),
        withLatestFrom(this.store.select(lastActionIndexSelector)),
        switchMap(([missed, lastActionIndex]: [boolean, number]) => {
            if (missed) {
                // Not show the warning if it's init restoring
                if (lastActionIndex > 0) {
                    // TODO: Localization
                    this.globalAlertService.warn('There are missed actions. Restoring the lobby.');
                }

                let restoreOnlyActions = lastActionIndex > 0;

                return timer(this.REQUEST_LOBBY_STATE_DELAY, this.REQUEST_LOBBY_STATE_INTERVAL)
                    .pipe(
                        map(() => restoreOnlyActions),
                        tap(() => {
                            restoreOnlyActions = false;
                        })
                    );
            }

            return EMPTY;
        }),
        withLatestFrom(this.store.select(lastActionIndexSelector)),
        tap(([restoreOnlyActions, lastActionIndex]: [boolean, number]) => {
            if (restoreOnlyActions) {
                this.applyAction(shareActionsLobbyAction(lastActionIndex), true);
            } else {
                this.applyAction(shareLobbyAction(), true);
            }
        })
    );

    private readonly delayUntilProcessed = pipe(
        delayWhen(() => this.store.select(isProcessingSelector)
            .pipe(filter(isProcessing => !isProcessing))
        )
    );

    private readonly delayUntilInitialized = pipe(
        delayWhen(() => this.store.select(initializedSelector)
            .pipe(filter(initialized => initialized)))
    );
}
