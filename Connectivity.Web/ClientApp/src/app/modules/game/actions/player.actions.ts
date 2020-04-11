import { createAction } from '@ngrx/store';

export const takeCardPlayer = createAction('[V] [Player] Take Card', (playerId: string, cardId: string) => ({
    payload: {
        playerId,
        cardId
    }
}));
export type TakeCardPlayer = ReturnType<typeof takeCardPlayer>;
