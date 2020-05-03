import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addElement, removeElementWith, replaceElementWith } from '@shared/utils/array.utils';

import {
    InitLobbyAction,
    initLobbyAction,
    JoinTeamPlayerAction,
    joinTeamPlayerAction,
    LeavePlayerAction,
    leavePlayerAction,
    LeaveTeamPlayerAction,
    leaveTeamPlayerAction,
    NewPlayerAction,
    newPlayerAction,
    NextPlayerGameAction,
    nextPlayerGameSysAction,
    NotReadyPlayerAction,
    notReadyPlayerAction,
    ReadyPlayerAction,
    readyPlayerAction,
    ResetAppAction,
    resetAppAction,
    RestoreLobbyAction,
    restoreLobbyAction,
    RollDicePlayerAction,
    rollDicePlayerAction,
    StartGameAction,
    startGameSysAction,
    UpdateLastActionIndexLobbyAction,
    updateLastActionIndexLobbyAction,
} from '../actions';
import { GameStatus } from '../enums';
import { playerComparator } from '../helpers';
import { initialLobby, Lobby } from '../models';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(resetAppAction, (state: Lobby, { payload }: ResetAppAction): Lobby => ({
        ...initialLobby
    })),

    on(initLobbyAction, (state: Lobby, { payload }: InitLobbyAction): Lobby => ({
        ...payload.lobby
    })),

    on(restoreLobbyAction, (state: Lobby, { payload }: RestoreLobbyAction): Lobby => ({
        ...state,
        ...payload.lobby
    })),

    on(updateLastActionIndexLobbyAction, (state: Lobby, { payload }: UpdateLastActionIndexLobbyAction): Lobby => ({
        ...state,
        lastActionIndex: payload.lastActionIndex
    })),

    on(newPlayerAction, (state: Lobby, { payload }: NewPlayerAction): Lobby => ({
        ...state,
        players: addElement(state.players, payload.player, playerComparator)
    })),

    on(leavePlayerAction, (state: Lobby, { payload }: LeavePlayerAction): Lobby => ({
        ...state,
        players: removeElementWith(state.players, p => p.id === payload.playerId)
    })),

    on(joinTeamPlayerAction, (state: Lobby, { payload }: JoinTeamPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            teamId: payload.teamId
        }))
    })),

    on(leaveTeamPlayerAction, (state: Lobby, { payload }: LeaveTeamPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            teamId: null
        }))
    })),

    on(readyPlayerAction, (state: Lobby, { payload }: ReadyPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            ready: true
        }))
    })),

    on(notReadyPlayerAction, (state: Lobby, { payload }: NotReadyPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            ready: false
        }))
    })),

    on(startGameSysAction, (state: Lobby, { payload }: StartGameAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            status: GameStatus.Playing,
            playerTurnId: state.players[0].id
        }
    })),

    on(rollDicePlayerAction, (state: Lobby, { payload }: RollDicePlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            diceValue: payload.value
        }
    })),

    on(nextPlayerGameSysAction, (state: Lobby, { payload }: NextPlayerGameAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnId: payload.nextPlayerTurnId,
            diceValue: null
        }
    }))
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
