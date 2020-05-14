import { isBoolean } from 'lodash';

import { GameCard } from './game-card.model';

export class PlayerTurnState {
    public diceValue?: number;
    public gameCard?: GameCard;

    public cardReadingStartedAt?: string;
    public cardReadingFinished?: boolean;

    public cardTaskStartedAt?: string;
    public cardTaskFinished?: boolean;
    public cardTaskResult?: boolean;

    constructor(model: Partial<PlayerTurnState> = {}) {
        Object.assign(this, model);
    }
}

export function isReadingCard(playerTurnState: PlayerTurnState): boolean {
    return !!playerTurnState
        && !!playerTurnState.cardReadingStartedAt
        && !playerTurnState.cardReadingFinished;
}

export function isCardTaskActive(playerTurnState: PlayerTurnState): boolean {
    return !!playerTurnState
        && !!playerTurnState.cardReadingFinished
        && !!playerTurnState.cardTaskStartedAt
        && !playerTurnState.cardTaskFinished;
}

export function isCardTaskFinished(playerTurnState: PlayerTurnState): boolean {
    return !!playerTurnState
        && !!playerTurnState.cardReadingFinished
        && !!playerTurnState.cardTaskFinished;
}

export function isCardTaskResulted(playerTurnState: PlayerTurnState): boolean {
    return !!playerTurnState
        && !!playerTurnState.cardTaskFinished
        && isBoolean(playerTurnState.cardTaskResult);
}
