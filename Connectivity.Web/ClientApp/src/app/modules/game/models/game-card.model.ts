import { GameCardType } from '../enums';
import { GameCardTask } from './game-card-task.model';

export class GameCard {
    public id: string;
    public type: GameCardType;
    public task: GameCardTask;
    public timespan: number;
    public reward: number;

    constructor(model: Partial<GameCard> = {}) {
        Object.assign(this, model);
    }
}
