import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { Guid } from 'guid-typescript';

import { GameState, gameInitialState } from '../states/game.state';

import * as PlayerActions from '../actions/player.actions';
import * as GameActions from '../actions/game.actions';

const _gameReducer: ActionReducer<GameState> = createReducer(
    gameInitialState,

    on(GameActions.initGame, (state: GameState, { payload }: GameActions.InitGame): GameState => ({
        ...state,
        config: payload.gameConfig
    })),

    on(GameActions.initGameSuccess, (state: GameState, { payload }: GameActions.InitGameSuccess): GameState => ({
        ...state,
        id: payload.gameId
    })),

    on(GameActions.newPlayer, (state: GameState, { payload }: PlayerActions.JoinPlayer): GameState => ({
        ...state,
        players: [...state.players, payload.player]
    })),
);

export function gameReducer(state: GameState, action: Action): GameState {
    return _gameReducer(state, action);
}
