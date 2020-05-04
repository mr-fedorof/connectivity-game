import { GameStatus } from '../enums';
import { PlayerTurnState } from './player-turn-state.model';

export class Game {
    public status: GameStatus;
    public playerTurnId?: string;
    public playerTurnState?: PlayerTurnState;

    constructor(model: Partial<Game> = {}) {
        Object.assign(this, model);
    }
}
