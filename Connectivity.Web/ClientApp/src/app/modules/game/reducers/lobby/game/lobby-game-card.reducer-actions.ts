import { on } from '@ngrx/store';

import {
    CardReadingFinishGameSysAction,
    cardReadingFinishGameSysAction,
    CardReadingFinishPlayerAction,
    cardReadingFinishPlayerAction,
    CardReadingStartGameSysAction,
    cardReadingStartGameSysAction,
    TakeAnotherCardPlayerAction,
    takeAnotherCardPlayerAction,
    TakeCardPlayerAction,
    takeCardPlayerAction,
} from '../../../actions';
import { Lobby } from '../../../models';

export const lobbyGameCardReducerActions = [
    on(takeCardPlayerAction, (state: Lobby, { payload }: TakeCardPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                gameCard: payload.gameCard,
            },
        },
    })),

    on(takeAnotherCardPlayerAction, (state: Lobby, { payload }: TakeAnotherCardPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                gameCard: payload.gameCard,
                cardReadingStartedAt: null,
            },
        },
    })),

    on(cardReadingStartGameSysAction, (state: Lobby, { payload }: CardReadingStartGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardReadingStartedAt: payload.startedAt,
            },
        },
    })),

    on(cardReadingFinishPlayerAction, (state: Lobby, { payload }: CardReadingFinishPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardReadingFinished: true,
            },
        },
    })),

    on(cardReadingFinishGameSysAction, (state: Lobby, { payload }: CardReadingFinishGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardReadingFinished: true,
            },
        },
    })),
];
