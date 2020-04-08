import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lobby } from '@modules/game/models';
import { Store, select } from '@ngrx/store';
import { lobbySelector } from '@modules/game/selectors/lobby.selectors';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
    public lobby$: Observable<Lobby>;

    constructor(
        private readonly store: Store,
    ) {
    }

    ngOnInit() {
        this.lobby$ = this.store.pipe(select(lobbySelector));
    }
}
