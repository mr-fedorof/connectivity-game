import { Injectable } from '@angular/core';

import { addLocalStorageArrayItem, getLocalStorageArrayItem, removeLocalStorageArrayItem } from '../helpers';
import { GameSession } from '../models';

@Injectable()
export class GameSessionStorage {
    private readonly CACHE_KEY = 'game-sessions';
    private readonly EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 hours

    public get(lobbyId: string): GameSession | null {
        const gameSession = getLocalStorageArrayItem<GameSession>(this.CACHE_KEY, item => item.lobbyId === lobbyId);

        return gameSession;
    }

    public add(gameSession: GameSession): void {
        addLocalStorageArrayItem<GameSession>(
            this.CACHE_KEY,
            gameSession,
            item => item.lobbyId === gameSession.lobbyId,
            this.EXPIRATION_TIME);
    }

    public remove(lobbyId: string): void {
        removeLocalStorageArrayItem<GameSession>(this.CACHE_KEY, item => item.lobbyId === lobbyId);
    }
}
