import { GameCardTaskType } from '../enums';

export class GameCardTask {
    public id: string;
    public type: GameCardTaskType;
    public questions: string[];
    public bannedWords: string[];

    constructor(model: Partial<GameCardTask> = {}) {
        Object.assign(this, model);
    }
}
