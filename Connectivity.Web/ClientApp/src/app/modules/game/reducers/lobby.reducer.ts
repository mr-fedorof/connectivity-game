import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addElement, removeElementWith, replaceElementWith } from '@shared/utils/array.utils';

import {
    CardReadingFinishGameSysAction,
    cardReadingFinishGameSysAction,
    CardReadingFinishPlayerAction,
    cardReadingFinishPlayerAction,
    CardReadingStartPlayerAction,
    cardReadingStartPlayerAction,
    CardTaskFailPlayerAction,
    cardTaskFailPlayerAction,
    CardTaskSuccessPlayerAction,
    cardTaskSuccessPlayerAction,
    FinishCardTaskGameSysAction,
    finishCardTaskGameSysAction,
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
    NextPlayerGameSysAction,
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
    StartCardTaskGameSysAction,
    startCardTaskGameSysAction,
    StartGameSysAction,
    startGameSysAction,
    TakeCardPlayerAction,
    takeCardPlayerAction,
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

    on(startGameSysAction, (state: Lobby, { payload }: StartGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            status: GameStatus.Playing,
            playerTurnId: state.players[0].id,
            playerTurnState: {}
        }
    })),

    on(rollDicePlayerAction, (state: Lobby, { payload }: RollDicePlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                diceValue: payload.value
            }
        }
    })),

    on(takeCardPlayerAction, (state: Lobby, { payload }: TakeCardPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                gameCard: payload.gameCard
            }
        }
    })),

    on(cardReadingStartPlayerAction, (state: Lobby, { payload }: CardReadingStartPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardReadingStartedAt: payload.startedAt
            }
        }
    })),

    on(cardReadingFinishPlayerAction, (state: Lobby, { payload }: CardReadingFinishPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardReadingFinished: true
            }
        }
    })),

    on(cardReadingFinishGameSysAction, (state: Lobby, { payload }: CardReadingFinishGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardReadingFinished: true
            }
        }
    })),

    on(startCardTaskGameSysAction, (state: Lobby, { payload }: StartCardTaskGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskStartedAt: payload.startedAt
            }
        }
    })),

    on(finishCardTaskGameSysAction, (state: Lobby, { payload }: FinishCardTaskGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskFinished: true
            }
        }
    })),

    on(cardTaskSuccessPlayerAction, (state: Lobby, { payload }: CardTaskSuccessPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskResult: true
            }
        }
    })),

    on(cardTaskFailPlayerAction, (state: Lobby, { payload }: CardTaskFailPlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                cardTaskResult: false
            }
        }
    })),

    on(nextPlayerGameSysAction, (state: Lobby, { payload }: NextPlayerGameSysAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnId: payload.nextPlayerTurnId,
            playerTurnState: {}
        }
    }))
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
