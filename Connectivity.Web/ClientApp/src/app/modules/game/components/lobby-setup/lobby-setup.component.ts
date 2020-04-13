import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { validateForm } from '@modules/app-form/helpers';
import { createLobbyAction } from '@modules/game/actions/lobby.actions';
import { Lobby, Team } from '@modules/game/models';
import { LobbyService } from '@modules/game/services';
import { GlobalSpinnerService } from '@modules/spinner';
import { Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { LobbySetupForm } from './lobby-setup-form';

@Component({
    selector: 'app-lobby-setup',
    templateUrl: './lobby-setup.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbySetupComponent extends DestroyableComponent implements OnInit, OnDestroy {
    public lobbyForm: LobbySetupForm;

    constructor(
        private readonly store: Store,
        private readonly lobbyService: LobbyService,
        private readonly spinnerService: GlobalSpinnerService
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
        if (!validateForm(this.lobbyForm)) {
            return;
        }

        const lobbyFormValue = this.lobbyForm.value;
        const lobby = new Lobby({
            name: lobbyFormValue.name,
            teams: lobbyFormValue.teams.map(name => new Team({
                name
            }))
        });

        this.lobbyService.createLobby(lobby)
            .wrapWithSpinner(this.spinnerService)
            .subscribe(createdLobby => {
                this.store.dispatch(createLobbyAction(createdLobby));
            });
    }
}
