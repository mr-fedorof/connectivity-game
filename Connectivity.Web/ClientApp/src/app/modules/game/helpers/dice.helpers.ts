import { GameCardType } from '../enums';

export function gameCardTypeToDice(type: GameCardType): number {
    switch (type) {
        case GameCardType.Talk:
            return 1;
        case GameCardType.Mine:
            return 2;
        case GameCardType.Draw:
            return 3;
        case GameCardType.Crocodile:
            return 4;
        case GameCardType.Agent:
            return 5;
        case GameCardType.Joker:
            return 6;
        default:
            return 0;
    }
}
