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

export function diceToGameCardType(dice: number): GameCardType {
    switch (dice) {
        case 1:
            return GameCardType.Talk;
        case 2:
            return GameCardType.Mine;
        case 3:
            return GameCardType.Draw;
        case 4:
            return GameCardType.Crocodile;
        case 5:
            return GameCardType.Agent;
        case 6:
            return GameCardType.Joker;
        default:
            return null;
    }
}
