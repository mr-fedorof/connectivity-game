import { on } from '@ngrx/store';

import {
    NextPlayerGameSysAction,
    nextPlayerGameSysAction,
    NotReadyToStartGameSysAction,
    notReadyToStartGameSysAction,
    ReadyToStartGameSysAction,
    readyToStartGameSysAction,
    StartGameSysAction,
    startGameSysAction,
} from '../../actions';
import { GameStatus } from '../../enums';
import { Lobby } from '../../models';
import { lobbyGameCardTaskReducerActions } from './game/lobby-game-card-task.reducer-actions';
import { lobbyGameCardReducerActions } from './game/lobby-game-card.reducer-actions';
import { lobbyGamePlayerReducerActions } from './game/lobby-game-player.reducer-actions';

export const lobbyGameReducerActions = [
    on(readyToStartGameSysAction, (state: Lobby, { payload }: ReadyToStartGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            readyToStartAt: payload.readyToStartAt,
        },
    })),

    on(notReadyToStartGameSysAction, (state: Lobby, { payload }: NotReadyToStartGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            readyToStartAt: null,
        },
    })),

    on(startGameSysAction, (state: Lobby, { payload }: StartGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            status: GameStatus.Playing,
            playerTurnId: state.players[0].id,
            playerTurnState: {},
        },
    })),

    on(nextPlayerGameSysAction, (state: Lobby, { payload }: NextPlayerGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnId: payload.nextPlayerTurnId,
            playerTurnState: {},
        },
    })),

    ...lobbyGamePlayerReducerActions,
    ...lobbyGameCardReducerActions,
    ...lobbyGameCardTaskReducerActions,
];
