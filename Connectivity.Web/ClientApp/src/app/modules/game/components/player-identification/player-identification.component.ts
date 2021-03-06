import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@modules/app-core/services';
import { validateForm } from '@modules/app-form/helpers';
import { addPendingActionLobbyStateAction } from '@modules/game/actions';
import { Player } from '@modules/game/models';
import { LobbyService } from '@modules/game/services';
import { GlobalSpinnerService } from '@modules/spinner';
import { Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { getRouteParam } from '@shared/utils/route.utils';

import { PlayerIdentificationForm } from './player-identification-form';

@Component({
    selector: 'app-player-identification',
    templateUrl: './player-identification.component.html',
    styleUrls: ['./player-identification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerIdentificationComponent extends DestroyableComponent implements OnInit, OnDestroy {
    public lobbyId: string;
    public form: PlayerIdentificationForm;

    constructor(
        private readonly lobbyService: LobbyService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly spinner: GlobalSpinnerService,
        private readonly store: Store
    ) {
        super();
    }

    public ngOnInit(): void {
        const lobbyId = getRouteParam(this.activatedRoute.snapshot, 'lobbyId');
        if (!lobbyId) {
            this.navigationService.goToHome();

            return;
        }

        this.lobbyId = lobbyId;
        this.form = new PlayerIdentificationForm();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.form.destroy();
    }

    public onFormSubmit(): void {
        if (!validateForm(this.form)) {
            return;
        }

        const player = new Player({
            name: this.form.value.name,
        });

        this.lobbyService.joinLobby(this.lobbyId, player)
            .wrapWithSpinner(this.spinner)
            .subscribe(action => {
                this.navigationService.goToLobby(this.lobbyId)
                    .subscribe(success => {
                        if (success) {
                            this.store.dispatch(addPendingActionLobbyStateAction(action));
                        }
                    });
            });
    }
}
