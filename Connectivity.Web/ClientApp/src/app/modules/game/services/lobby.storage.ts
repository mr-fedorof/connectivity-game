import { Injectable } from '@angular/core';

import { addLocalStorageArrayItem, getLocalStorageArrayItem, removeLocalStorageArrayItem } from '../helpers';
import { Lobby } from '../models';

@Injectable()
export class LobbyStorage {
    private readonly CACHE_KEY = 'lobbies';
    private readonly EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 hours

    public get(lobbyId: string): Lobby | null {
        const lobby = getLocalStorageArrayItem<Lobby>(this.CACHE_KEY, item => item.id === lobbyId);

        return lobby;
    }

    public add(lobby: Lobby): void {
        addLocalStorageArrayItem<Lobby>(
            this.CACHE_KEY,
            lobby,
            item => item.id === lobby.id,
            this.EXPIRATION_TIME);
    }

    public remove(lobbyId: string): void {
        removeLocalStorageArrayItem<Lobby>(this.CACHE_KEY, item => item.id === lobbyId);
    }
}
