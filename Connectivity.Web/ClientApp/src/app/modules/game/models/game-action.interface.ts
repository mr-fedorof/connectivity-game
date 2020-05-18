// tslint:disable: interface-name
import { Action } from '@ngrx/store';

declare module '@ngrx/store' {
    interface Action {
        type: string;
        lobbyId?: string;
        playerId?: string;
        index?: number;
        long?: boolean;
        createdAt?: string;
    }
}
