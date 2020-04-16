import { createAction } from '@ngrx/store';

import { Player } from '../models';

export const newPlayerAction = createAction('[Player] New', (player: Player) => ({
    payload: {
        player
    }
}));
export type NewPlayerAction = ReturnType<typeof newPlayerAction>;

export const takeCardPlayerAction = createAction('[Player] [S] Take Card', (playerId: string, cardType: number) => ({
    payload: {
        cardType
    }
}));
export type TakeCardPlayerAction = ReturnType<typeof takeCardPlayerAction>;
