import { createAction } from '@ngrx/store';
import { Player } from '../models';

export const joinPlayer = createAction('[Player] Join', (gameId: string, player: Player) => ({
    payload: {
        gameId,
        player
    }
}));
export type JoinPlayer = ReturnType<typeof joinPlayer>;

export const joinPlayerSuccess = createAction('[Player] Join Success', (player: Player) => ({
    payload: { player }
}));
export type JoinPlayerSuccess = ReturnType<typeof joinPlayerSuccess>;
