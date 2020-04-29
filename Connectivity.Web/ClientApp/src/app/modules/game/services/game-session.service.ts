import { Injectable } from '@angular/core';

import { GameSession } from '../models';

@Injectable()
export class GameSessionService {
    // TODO: Add expiration

    public getGameSession(lobbyId: string): GameSession | null {
        const rawGameSessions = localStorage.getItem('game-sessions');
        const gameSessions: GameSession[] = JSON.parse(rawGameSessions) || [];

        const gameSession = gameSessions.find(s => s.lobbyId === lobbyId);
        if (!gameSession) {
            return null;
        }

        return gameSession;
    }

    public saveGameSession(user: GameSession): void {
        const rawGameSessions = localStorage.getItem('game-sessions');
        const gameSessions: GameSession[] = JSON.parse(rawGameSessions) || [];

        gameSessions.push(user);

        localStorage.setItem('game-sessions', JSON.stringify(gameSessions));
    }

    public removeGameSession(lobbyId: string): void {
        const rawGameSessions = localStorage.getItem('game-sessions');
        const gameSessions: GameSession[] = JSON.parse(rawGameSessions) || [];

        const index = gameSessions.findIndex(s => s.lobbyId === lobbyId);
        if (index >= 0) {
            gameSessions.splice(index, 1);
        }

        localStorage.setItem('game-sessions', JSON.stringify(gameSessions));
    }
}
