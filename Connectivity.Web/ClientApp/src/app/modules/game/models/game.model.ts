import { GameStatus } from '../enums';

export class Game {
    public status: GameStatus;
    public playerTurnId?: string;

    constructor(model: Partial<Game> = {}) {
        Object.assign(this, model);
    }
}
