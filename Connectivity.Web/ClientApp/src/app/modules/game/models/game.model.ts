import { GameStatus } from '../enums';

export class Game {
    public status: GameStatus;
    public currentPlayerId?: number;

    constructor(model: Partial<Game> = {}) {
        Object.assign(this, model);
    }
}
