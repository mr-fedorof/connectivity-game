import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { validateForm } from '@modules/app-form/helpers';
import { newLobby } from '@modules/game/actions/lobby.actions';
import { Lobby, Team } from '@modules/game/models';
import { Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { LobbySetupForm } from './lobby-setup-form';

@Component({
    selector: 'app-lobby-setup',
    templateUrl: './lobby-setup.component.html',
    styleUrls: ['./lobby-setup.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbySetupComponent extends DestroyableComponent implements OnInit, OnDestroy {
    public lobbyForm: LobbySetupForm;

    constructor(
        private readonly store: Store
    ) {
        super();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.lobbyForm.destroy();
    }

    public ngOnInit(): void {
        this.lobbyForm = new LobbySetupForm();
    }

    public onCreateLobbyClick(): void {
        if (validateForm(this.lobbyForm)) {
            this.store.dispatch(newLobby(this.createLobbyRequest()));
        }
    }

    private createLobbyRequest(): Lobby {
        const lobbyFormValue = this.lobbyForm.value;

        const lobby = new Lobby({
            name: lobbyFormValue.name,
            teams: lobbyFormValue.teams.map(name => new Team({
                name
            }))
        });

        return lobby;
    }
}
