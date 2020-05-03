import { GameStatus } from '../enums';

export class Game {
    public status: GameStatus;
    public playerTurnId?: string;
    public diceValue?: number;

    constructor(model: Partial<Game> = {}) {
        Object.assign(this, model);
    }
}
