import { GameCard } from './game-card.model';

export class PlayerTurnState {
    public diceValue?: number;
    public gameCard?: GameCard;
    public cardReadingStartedAt?: string;
    public cardReadingFinished?: boolean;

    constructor(model: Partial<PlayerTurnState> = {}) {
        Object.assign(this, model);
    }
}

export function isReadingCard(playerTurnState: PlayerTurnState): boolean {
    return !!playerTurnState
        && !!playerTurnState.cardReadingStartedAt
        && !playerTurnState.cardReadingFinished;
}
