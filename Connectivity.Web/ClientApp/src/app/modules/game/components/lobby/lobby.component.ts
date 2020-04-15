import { Component, OnInit } from '@angular/core';
import { hiThanksAction, takeCardPlayerAction } from '@modules/game/actions';
import { GameSession, Lobby } from '@modules/game/models';
import { gameSessionSelector } from '@modules/game/selectors/game-session.selectors';
import { lobbySelector } from '@modules/game/selectors/lobby.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html'
})
export class LobbyComponent implements OnInit {
    public lobby$: Observable<Lobby>;
    public gameSession$: Observable<GameSession>;

    constructor(
        private readonly store: Store
    ) {
    }

    public ngOnInit(): void {
        this.lobby$ = this.store.pipe(select(lobbySelector));
        this.gameSession$ = this.store.pipe(select(gameSessionSelector));
    }

    public sendAction(): void {
        const cardType: number = Math.random();

        this.gameSession$
            .pipe(take(1))
            .subscribe(gameSession => {
                this.store.dispatch(takeCardPlayerAction(gameSession.playerId, cardType));
            });
    }

    // TODO: for testing purposes, can be removed
    public hiThanks(): void {
        const cardType: number = Math.random();

        this.gameSession$
            .pipe(take(1))
            .subscribe(gameSession => {
                this.store.dispatch(hiThanksAction('V', 'Vendetta'));
            });
    }
}
