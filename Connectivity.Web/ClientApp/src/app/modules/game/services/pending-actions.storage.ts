import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { addLocalStorageArrayItem, getLocalStorageArrayItem, removeLocalStorageArrayItem } from '../helpers';

interface ICacheItem {
    lobbyId: string;
    actions: Action[];
}

@Injectable()
export class PendingActionsStorage {
    private readonly CACHE_KEY = 'pending-Actions';
    private readonly EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 hours

    public get(lobbyId: string): Action[] | null {
        const caheItem = getLocalStorageArrayItem<ICacheItem>(this.CACHE_KEY, item => item.lobbyId === lobbyId);
        if (!caheItem) {
            return null;
        }

        return caheItem.actions;
    }

    public add(lobbyId: string, actions: Action[]): void {
        addLocalStorageArrayItem<ICacheItem>(
            this.CACHE_KEY,
            {
                lobbyId,
                actions
            },
            item => item.lobbyId === lobbyId,
            this.EXPIRATION_TIME);
    }

    public remove(lobbyId: string): void {
        removeLocalStorageArrayItem<ICacheItem>(this.CACHE_KEY, item => item.lobbyId === lobbyId);
    }
}
