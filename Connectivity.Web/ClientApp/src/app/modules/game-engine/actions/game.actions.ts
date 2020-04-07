import { createAction } from '@ngrx/store';
import { GameConfig, Player } from '../models';

export const initGame = createAction('[Game] Init', (gameConfig: GameConfig) => ({
    payload: { gameConfig }
}));
export type InitGame = ReturnType<typeof initGame>;

export const initGameSuccess = createAction('[Game] Init Success', (gameId: string) => ({
    payload: { gameId }
}));
export type InitGameSuccess = ReturnType<typeof initGameSuccess>;

export const newPlayer = createAction('[Game] New Player', (player: Player) => ({
    payload: { player }
}));
export type NewPlayer = ReturnType<typeof newPlayer>;
