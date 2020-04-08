import { GameConfig, Player } from '../models';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface IGameService {
    initGame(gameConfig: GameConfig): Observable<string>;
    joinPlayer(gameId: string, player: Player): Observable<Player>;
}

export const GAME_SERVICE_TOKEN = new InjectionToken<IGameService>('IGameService');
