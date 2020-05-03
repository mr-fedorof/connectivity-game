import { Injectable } from '@angular/core';
import { GlobalAlertService } from '@modules/alert/services';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DestroyableService } from '@shared/destroyable';
import { minBy } from 'lodash';
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
    addPendingActionLobbyStateAction,
    removePendingActionLobbyStateAction,
    shareActionsLobbyAction,
    shareLobbyAction,
    updateGlobalIndexLobbyStateAction,
} from '../actions';
import {
    actionsIncludes,
    gameActionComparator,
    isOrderedAction,
    isOriginalAction,
    isOutOfOrderAction,
    isShareAction,
    isSystemAction,
} from '../helpers';
import { GameSession, Lobby, Player } from '../models';
import { gameSessionSelector } from '../selectors/game-session.selectors';
import {
    globalActionIndexSelector,
    indexedActionsSelector,
    isProcessingSelector,
    lobbyStateInitializedSelector,
    pendingActionsCountSelector,
    pendingActionsSelector,
} from '../selectors/lobby-state.selectors';
import {
    currentPlayerSelector,
    lastActionIndexSelector,
    lobbySelector,
    nextActionIndexSelector,
} from '../selectors/lobby.selectors';
import { GameHubService } from './game-hub.service';

@Injectable()
export class ActionService extends DestroyableService {
    public readonly ALLOWED_MISSED_ACTION_FRAME = 10;
    public readonly REQUEST_LOBBY_STATE_DELAY = 15 * 1000;
    public readonly REQUEST_LOBBY_STATE_INTERVAL = 15 * 1000;
    public readonly SYSTEM_ACTION_SEND_INTERVAL = 5 * 1000;

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
                this.systemActionHandlingPipe,
                this.actionSharingPipe,
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
                this.actionSharingPipe,
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
        }))
    );

    private readonly actionSharingPipe = pipe(
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

    // Approach how to handle system actions
    //
    // The main idea that the responsibility to apply a system action is on the each player
    // if the first player couldn't send the action, then after 5s the second player will try to send the action
    // if the second player couldn't send the action, then after another 5s the third player will try to send the action
    // and so on
    // if the last player couldn't send the action, the tries will start from the first player
    private readonly systemActionHandlingPipe = pipe(
        withLatestFrom(
            this.store.select(lobbySelector),
            this.store.select(currentPlayerSelector),
            this.store.select(lastActionIndexSelector)
        ),
        switchMap(([action, lobby, currentPlayer, lastActionIndex]: [Action, Lobby, Player, number]) => {
            if (!isSystemAction(action)) {
                return of(action);
            }

            const currentPlayerIndex = lobby.players.findIndex(p => p.id === currentPlayer.id);
            if (currentPlayerIndex === 0) {
                return of(action);
            }

            const delay = currentPlayerIndex * this.SYSTEM_ACTION_SEND_INTERVAL;
            const interval = lobby.players.length * this.SYSTEM_ACTION_SEND_INTERVAL;

            return timer(delay, interval)
                .pipe(
                    takeUntil(this.store.select(indexedActionsSelector)
                        .pipe(filter(handledActions =>
                            this.handledActionsIncludes(handledActions, action, lastActionIndex)))
                    ),
                    map(() => action)
                );
        })
    );

    private handledActionsIncludes(handledActions: Action[], action: Action, fromActionIndex: number): boolean {
        if (handledActions.length === 0) {
            return false;
        }

        const firstActionIndex = handledActions[0].index;
        // Assumes that handled actions are aligned by index
        const lastActionArrayIndex = fromActionIndex - firstActionIndex;

        for (let i = lastActionArrayIndex; i < handledActions.length; i++) {
            const handledAction = handledActions[i];

            if (handledAction.type === action.type) {
                return true;
            }
        }

        return false;
    }

    private readonly globalActionIndexUpdatingPipe = pipe(
        withLatestFrom(this.store.select(globalActionIndexSelector)),
        tap(([action, globalActionIndex]: [Action, number]) => {
            if (isOrderedAction(action) && action.index > globalActionIndex) {
                this.store.dispatch(updateGlobalIndexLobbyStateAction(action.index));
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
                    this.store.dispatch(removePendingActionLobbyStateAction(action));
                }

                if (action.index > nextActionIndex && !actionsIncludes(pendingActions, action)) {
                    this.store.dispatch(addPendingActionLobbyStateAction(action));
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
                this.store.dispatch(addPendingActionLobbyStateAction(action));
            }

            return of(action)
                .pipe(this.delayUntilProcessed);
        }),
        withLatestFrom(this.store.select(pendingActionsSelector)),
        tap(([action, pendingActions]: [Action, Action[]]) => {
            if (pendingActions.find(pa => gameActionComparator(pa, action))) {
                this.store.dispatch(removePendingActionLobbyStateAction(action));
            }
        }),
        map(([action, pendingActions]: [Action, Action[]]) => action)
    );

    private readonly lobbyStateRestoringPipe = pipe(
        withLatestFrom(
            this.store.select(pendingActionsSelector),
            this.store.select(nextActionIndexSelector)
        ),
        map(([count, pendingActions, nextActionIndex]: [number, Action[], number]) => {
            if (count <= this.ALLOWED_MISSED_ACTION_FRAME) {
                return false;
            }

            if (pendingActions.length === 0) {
                return true;
            }

            return minBy(pendingActions, 'index').index > nextActionIndex;
        }),
        distinctUntilChanged(),

        withLatestFrom(this.store.select(lastActionIndexSelector)),
        switchMap(([missed, lastActionIndex]: [boolean, number]) => {
            if (!missed) {
                return EMPTY;
            }

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
        delayWhen(() => this.store.select(lobbyStateInitializedSelector)
            .pipe(filter(initialized => initialized)))
    );
}
