import { Player, GameConfig } from '../models';
import { GameStatus } from '../enums';

export interface GameState {
    id: string;
    config: GameConfig;
    players: Player[];
    status: GameStatus;
    currentPlayerId: number;
}

export const gameInitialState: GameState = {
    id: null,
    config: null,
    players: [],
    status: GameStatus.Initializing,
    currentPlayerId: null
};
