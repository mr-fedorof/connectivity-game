import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { DrawPayload } from '../models';
import { GameHubService, GameService } from '.';
import { tap } from 'rxjs/operators';

@Injectable()
export class GameRisovachService {
    private lobbyId;
    private readonly _drawSubject = new Subject<DrawPayload>();

    constructor(
        private readonly gameHubService: GameHubService,
        private readonly gameService: GameService,
    ) {
        this.gameService.lobby$
            .pipe(
                tap(lobby => {
                    this.lobbyId = lobby.id;
                    this.gameHubService.restoreDrawings(this.lobbyId);
                })
        ).subscribe();

        this.gameHubService.addDrawMoveListener().subscribe((drawPayload: DrawPayload) => {
            this._drawSubject.next(drawPayload);
        });

        this.gameHubService.addRestoreDrawingsListener().subscribe((drawPayloads: DrawPayload[]) => {
            drawPayloads.forEach(drawPayload => {
                this._drawSubject.next(drawPayload);
            });
        });
    }

    public get drawings$(): Observable<DrawPayload> {
        return this._drawSubject.asObservable();
    }

    public drawMove(drawPayload): void {
        this.gameHubService.drawMove(this.lobbyId, drawPayload);
    }


}
