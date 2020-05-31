import { on } from '@ngrx/store';

import {
    CardTaskFailPlayerAction,
    cardTaskFailPlayerAction,
    CardTaskSuccessPlayerAction,
    cardTaskSuccessPlayerAction,
    FinishCardTaskGameSysAction,
    finishCardTaskGameSysAction,
    StartCardTaskGameSysAction,
    startCardTaskGameSysAction,
    StartCardTaskPlayerAction,
    startCardTaskPlayerAction,
} from '../../../actions';
import { Lobby } from '../../../models';

export const lobbyGameCardTaskReducerActions = [
    on(startCardTaskPlayerAction, (state: Lobby, { payload }: StartCardTaskPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskStartedAt: payload.startedAt,
            },
        },
    })),

    on(startCardTaskGameSysAction, (state: Lobby, { payload }: StartCardTaskGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskStartedAt: payload.startedAt,
            },
        },
    })),

    on(finishCardTaskGameSysAction, (state: Lobby, { payload }: FinishCardTaskGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskFinished: true,
            },
        },
    })),

    on(cardTaskSuccessPlayerAction, (state: Lobby, { payload }: CardTaskSuccessPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskResult: true,
            },
        },
    })),

    on(cardTaskFailPlayerAction, (state: Lobby, { payload }: CardTaskFailPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskResult: false,
            },
        },
    })),
];
