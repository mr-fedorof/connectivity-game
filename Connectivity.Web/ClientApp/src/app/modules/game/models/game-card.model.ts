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

export function getCardName(type: GameCardType): string {
    switch (type) {
        case GameCardType.Talk:
            return 'GAME_CARD.TALK';
        case GameCardType.Mine:
            return 'GAME_CARD.MINE';
        case GameCardType.Draw:
            return 'GAME_CARD.DRAW';
        case GameCardType.Crocodile:
            return 'GAME_CARD.CROCODILE';
        case GameCardType.Agent:
            return 'GAME_CARD.AGENT';
        case GameCardType.Joker:
            return 'GAME_CARD.JOKER';
        default:
            return '';
    }
}
