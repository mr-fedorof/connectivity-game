import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Lobby, Team } from '@modules/game/models';
import { Store } from '@ngrx/store';
import { newLobby, newLobbySuccess } from '@modules/game/actions/lobby.actions';
import { DestroyableComponent } from '@shared/helpers';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lobby-setup',
    templateUrl: './lobby-setup.component.html',
    styleUrls: ['./lobby-setup.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbySetupComponent extends DestroyableComponent implements OnInit {
    public lobby: Lobby;
    public teamCount = 2;

    constructor(
        private readonly store: Store,
        private readonly actions: Actions,
        private readonly router: Router,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.lobby = new Lobby({
            teams: [
                new Team(),
                new Team(),
            ]
        });

        this.actions
            .pipe(ofType(newLobbySuccess))
            .subscribe(() => this.router.navigate(['/lobby']));
    }

    public onTeamCountChange(): void {
        this.lobby.teams = [...Array(this.teamCount).keys()].map(i => this.lobby.teams[i] || new Team());
    }

    public onFormSubmit(): void {
        this.store.dispatch(newLobby(this.lobby));
    }
}
