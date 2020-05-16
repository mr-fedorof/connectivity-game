import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { validateForm } from '@modules/app-form/helpers';
import { Lobby, Team } from '@modules/game/models';
import { LobbyService } from '@modules/game/services';
import { GlobalSpinnerService } from '@modules/spinner';
import { DestroyableComponent } from '@shared/destroyable';

import { LobbyCreateForm } from './lobby-create-form';

@Component({
    selector: 'app-lobby-create',
    templateUrl: './lobby-create.component.html',
    styleUrls: ['./lobby-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyCreateComponent extends DestroyableComponent implements OnInit, OnDestroy {
    public form: LobbyCreateForm;

    constructor(
        private readonly lobbyService: LobbyService,
        private readonly navigationService: NavigationService,
        private readonly spinnerService: GlobalSpinnerService
    ) {
        super();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.form.destroy();
    }

    public ngOnInit(): void {
        this.form = new LobbyCreateForm();
    }

    public onCreateLobbyClick(): void {
        if (!validateForm(this.form)) {
            return;
        }

        const lobbyFormValue = this.form.value;
        const lobby = new Lobby({
            name: lobbyFormValue.name,
            teams: lobbyFormValue.teams.map(name => new Team({
                name
            }))
        });

        this.lobbyService.createLobby(lobby)
            .wrapWithSpinner(this.spinnerService)
            .subscribe(createdLobby => {
                this.navigationService.goToLobby(createdLobby.id);
            });
    }

    public onCancelClick(): void {
        this.navigationService.goToHome();
    }
}
