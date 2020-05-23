import { GameStatus } from '../enums';
import { PlayerTurnState } from './player-turn-state.model';

export class Game {
    public status: GameStatus;
    public readyToStartAt?: string;
    public playerTurnId?: string;
    public playerTurnState?: PlayerTurnState;

    constructor(model: Partial<Game> = {}) {
        Object.assign(this, model);
    }
}

export function isStartingGame(game: Game): boolean {
    return !!game
        && game.status === GameStatus.WaitingForPlayers
        && !!game.readyToStartAt;
}
