import { createAction } from '@ngrx/store';
import { Player } from '../models';

export const joinPlayerAction = createAction('[Player] Join', (name: string) => ({
    payload: {
        name
    }
}));
export type JoinPlayerAction = ReturnType<typeof joinPlayerAction>;

export const newPlayerAction = createAction('[Player] [S] New', (player: Player) => ({
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

// TODO: for testing purposes, can be removed
export const hiThanksAction = createAction('HiThanks', (hi: string, thanks: string) => ({
    payload: {
        hi,
        thanks,
    }
}));
export type HiThanksAction = ReturnType<typeof hiThanksAction>;

