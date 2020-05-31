import { isBoolean } from 'lodash';

import { GameCardType } from '../enums';
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

export function isDiceRolled(playerTurnState: PlayerTurnState): boolean {
    return !!playerTurnState
        && playerTurnState.diceValue > 0;
}

export function isCardReadingStarted(playerTurnState: PlayerTurnState): boolean {
    return !!playerTurnState
        && !!playerTurnState.cardReadingStartedAt;
}

export function isCardReadingInProgress(playerTurnState: PlayerTurnState): boolean {
    return isCardReadingStarted(playerTurnState)
        && !playerTurnState.cardReadingFinished;
}

export function isCardReadingFinished(playerTurnState: PlayerTurnState): boolean {
    return isCardReadingStarted(playerTurnState)
        && !!playerTurnState.cardReadingFinished;
}

export function isCardTaskStartManual(playerTurnState: PlayerTurnState): boolean {
    return playerTurnState?.gameCard.type === GameCardType.WhoAmI;
}

export function isCardTaskStarted(playerTurnState: PlayerTurnState): boolean {
    return !!playerTurnState
        && !!playerTurnState.cardTaskStartedAt;
}

export function isCardTaskInProgress(playerTurnState: PlayerTurnState): boolean {
    return isCardTaskStarted(playerTurnState)
        && !playerTurnState.cardTaskFinished;
}

export function isCardTaskFinished(playerTurnState: PlayerTurnState): boolean {
    return isCardTaskStarted(playerTurnState)
        && !!playerTurnState.cardTaskFinished;
}

export function isCardTaskResulted(playerTurnState: PlayerTurnState): boolean {
    return isCardTaskFinished(playerTurnState)
        && isBoolean(playerTurnState.cardTaskResult);
}
