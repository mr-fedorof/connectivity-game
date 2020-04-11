import { Component, OnInit } from '@angular/core';
import { Lobby } from '@modules/game/models';
import { lobbySelector } from '@modules/game/selectors/lobby.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PlayerActions from '../../actions/player.actions';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
    public lobby$: Observable<Lobby>;

    constructor(
        private readonly store: Store
    ) {
    }

    public ngOnInit(): void {
        this.lobby$ = this.store.pipe(select(lobbySelector));
    }

    public sendAction(): void {
        const cardId: string = Math.random()
            .toString();

        this.store.dispatch(PlayerActions.takeCardPlayer('1', cardId));
    }
}
