import { Injectable } from '@angular/core';
import { IGameService } from '@modules/game-engine/services';
import { GameConfig, Player } from '@modules/game-engine/models';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable()
export class GameService implements IGameService {
    initGame(gameConfig: GameConfig): Observable<string> {
        return of(Guid.raw());
    }

    joinPlayer(gameId: string, player: Player): Observable<Player> {
        return of({
            ...player,
            id: Guid.raw()
        });
    }
}
