import { createSelector, MemoizedSelector } from '@ngrx/store';

import { GameStatus } from '../enums';
import { IGameEngineFeature } from '../game-engine.feature';
import { Game, Lobby } from '../models';
import { lobbySelector } from './lobby.selectors';

export const gameSelector: MemoizedSelector<IGameEngineFeature, Game> = createSelector(
    lobbySelector,
    (lobby: Lobby) => lobby.game
);

export const gameStatusSelector: MemoizedSelector<IGameEngineFeature, GameStatus> = createSelector(
    gameSelector,
    (game: Game) => game.status
);

export const playerTurnSelector: MemoizedSelector<IGameEngineFeature, string> = createSelector(
    gameSelector,
    (game: Game) => game.playerTurnId
);
