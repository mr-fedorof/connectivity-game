import { createSelector, MemoizedSelector } from '@ngrx/store';
import { flatMap } from 'lodash';

import { GameStatus } from '../enums';
import { IGameEngineFeature } from '../game-engine.feature';
import { Game, Lobby, Player, PlayerTurnState, Team } from '../models';
import { currentPlayerSelector, lobbySelector, playersSelector, teamsSelector } from './lobby.selectors';

export const gameSelector: MemoizedSelector<IGameEngineFeature, Game> = createSelector(
    lobbySelector,
    (lobby: Lobby) => lobby.game
);

export const gameStatusSelector: MemoizedSelector<IGameEngineFeature, GameStatus> = createSelector(
    gameSelector,
    (game: Game) => game.status
);

export const playerTurnIdSelector: MemoizedSelector<IGameEngineFeature, string> = createSelector(
    gameSelector,
    (game: Game) => game.playerTurnId
);

export const nextPlayerTurnIdSelector: MemoizedSelector<IGameEngineFeature, string> = createSelector(
    playersSelector,
    teamsSelector,
    playerTurnIdSelector,
    (players: Player[], teams: Team[], playerTurnId: string) => {
        if (!playerTurnId) {
            return null;
        }

        const orderedPlayers = flatMap(teams, t => players.filter(p => p.teamId === t.id));
        const currentIndex = orderedPlayers.findIndex(p => p.id === playerTurnId);
        if (currentIndex < 0) {
            return null;
        }

        const nextIndex = (currentIndex + 1) % orderedPlayers.length;

        return orderedPlayers[nextIndex].id;
    }
);

export const playerTurnStateSelector: MemoizedSelector<IGameEngineFeature, PlayerTurnState> = createSelector(
    gameSelector,
    (game: Game) => game.playerTurnState || {}
);

export const isCurrentPlayerTurnSelector: MemoizedSelector<IGameEngineFeature, boolean> = createSelector(
    gameSelector,
    currentPlayerSelector,
    (game, currentPlayer) => {
        if (!game || !currentPlayer || game.playerTurnId !== currentPlayer.id) {
            return false;
        }

        return true;
    }
);

export const activePlayerSelector: MemoizedSelector<IGameEngineFeature, Player> = createSelector(
    playerTurnIdSelector,
    playersSelector,
    (playerTurnId, players) => players?.find(p => p.id === playerTurnId)
);
