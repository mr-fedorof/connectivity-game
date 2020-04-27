import { Injectable } from '@angular/core';
import { GlobalSpinnerService } from '@modules/spinner';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DestroyableService } from '@shared/destroyable';
import { from, merge, Observable, of, pipe, Subject } from 'rxjs';
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

import { addPendingActionStateAction, removePendingActionStateAction } from '../actions';
import { isOrderedAction, isOutOfOrderAction } from '../helpers';
import { GameSession } from '../models';
import {
    isProcessingSelector,
    pendingActionsCountSelector,
    pendingActionsSelector,
} from '../selectors/action-state.selectors';
import { gameSessionSelector } from '../selectors/game-session.selectors';
import { nextActionIndexSelector } from '../selectors/lobby.selectors';
import { GameHubService } from './game-hub.service';

@Injectable()
export class ActionService extends DestroyableService {
    private readonly ALLOWED_PENDING_ACTIONS_COUNT = 10;

    private readonly _internalActionsSubject: Subject<Action> = new Subject<Action>();
    private readonly _exteranlActionsSubject: Subject<Action> = new Subject<Action>();
    private readonly _outActionsSubject: Subject<Action> = new Subject<Action>();

    public readonly internalActions$: Observable<Action>;
    public readonly exteranlActions$: Observable<Action>;
    public readonly pendingActions$: Observable<Action>;
    public readonly outActions$: Observable<Action>;

    public readonly actions$: Observable<Action>;
    public readonly waitingForActions$: Observable<boolean>;

    constructor(
        private readonly store: Store,
        private readonly gameHubService: GameHubService,
        private readonly globalSpinner: GlobalSpinnerService,
        private readonly storeActions$: Actions
    ) {
        super();

        this.storeActions$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(action => {
                // tslint:disable-next-line: no-console
                // console.log('action', action);
            });

        this.internalActions$ = this._internalActionsSubject.asObservable()
            .pipe(
                this.handleInternalActionPipe,
                share()
            );

        this.exteranlActions$ = this._exteranlActionsSubject.asObservable()
            .pipe(
                this.handleExternalActionPipe,
                share()
            );

        this.pendingActions$ = this.store.select(pendingActionsSelector)
            .pipe(
                tap(actions => {
                    // tslint:disable-next-line: no-console
                    console.log('pendingActions$', actions);
                }),
                switchMap(actions => from(actions)),
                share()
            );

        this.actions$ = merge(this.internalActions$, this.exteranlActions$, this.pendingActions$)
            .pipe(
                this.actionsOrderingPipe,
                this.actionProcessingPipe,
                distinctUntilChanged(),
                share()
            );

        this.outActions$ = this._outActionsSubject.asObservable()
            .pipe(
                this.handleInternalActionPipe,
                share()
            );

        this.waitingForActions$ = this.store.select(pendingActionsCountSelector)
            .pipe(
                map(count => count > this.ALLOWED_PENDING_ACTIONS_COUNT),
                distinctUntilChanged()
            );

        this.globalSpinner
            .showWhen(this.waitingForActions$)
            .pipe(takeUntil(this.onDestroy))
            .subscribe();

        this.actions$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(action => {
                this.store.dispatch(action);
            });

        this.outActions$
            .pipe(takeUntil(this.onDestroy))
            .subscribe();
    }

    public applyAction(action: Action): void {
        if (!action) {
            return;
        }

        if (typeof action.index === 'number' && (action.index >= 0 || action.index === -1)) {
            this._exteranlActionsSubject.next(action);
        } else {
            this._internalActionsSubject.next(action);
        }
    }

    public sendAction(action: Action): void {
        if (!action) {
            return;
        }

        this._outActionsSubject.next(action);
    }

    private readonly handleInternalActionPipe = pipe(
        withLatestFrom(this.store.select(gameSessionSelector)),
        filter(([action, gameSession]: [Action, GameSession]) => !!gameSession.playerId),
        map(([action, gameSession]: [Action, GameSession]) => ({
            ...action,
            lobbyId: gameSession.lobbyId,
            playerId: gameSession.playerId
        })),
        mergeMap((action: Action) => {
            if (action.type.includes('[Sh]')) {
                return this.gameHubService.sendAction(action)
                    .pipe(
                        tap(sentAction => {
                            // tslint:disable-next-line: no-console
                            console.log('out:', sentAction);
                        })
                    );
            }

            // tslint:disable-next-line: no-console
            console.log('sys:', action);

            return of(action);
        })
    );

    private readonly handleExternalActionPipe = pipe(
        tap((action: Action) => {
            // tslint:disable-next-line: no-console
            console.log('in:', action);
        })
    );

    private readonly actionsOrderingPipe = pipe(
        withLatestFrom(this.store.select(nextActionIndexSelector)),
        tap(([action, nextActionIndex]: [Action, number]) => {
            if (isOrderedAction(action)) {
                if (action.index < nextActionIndex) {
                    this.store.dispatch(removePendingActionStateAction(action));
                }

                if (action.index > nextActionIndex) {
                    this.store.dispatch(addPendingActionStateAction(action));
                }
            }
        }),
        filter(([action, nextActionIndex]: [Action, number]) => {
            const isNextAction =
                !action.type.includes('[Sh]') ||
                action.type.includes('[SI]') ||
                action.index === nextActionIndex;

            return isNextAction;
        }),
        map(([action, nextActionIndex]: [Action, number]) => action)
    );

    private readonly actionProcessingPipe = pipe(
        withLatestFrom(this.store.select(isProcessingSelector)),
        switchMap(([action, isProcessing]: [Action, boolean]) => {
            if (!isProcessing) {
                return of([action, true]);
            }

            if (isProcessing && isOutOfOrderAction(action)) {
                return of([action, true]);
            }

            this.store.dispatch(addPendingActionStateAction(action));

            return of(action)
                .pipe(
                    this.delayWhileProcessing,
                    map((action: Action) => ([action, false]))
                );
        }),
        tap(([action, instant]: [Action, boolean]) => {
            if (!instant) {
                this.store.dispatch(removePendingActionStateAction(action));
            }
        }),
        map(([action, instant]: [Action, boolean]) => action)
    );

    private readonly delayWhileProcessing = pipe(
        delayWhen(() => this.store.select(isProcessingSelector)
            .pipe(
                filter(isProcessing => !isProcessing)
            )
        )
    );
}
