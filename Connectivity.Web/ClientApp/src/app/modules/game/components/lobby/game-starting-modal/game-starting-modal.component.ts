import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { notReadyPlayerAction } from '@modules/game/actions';
import { timeLeftPipe } from '@modules/game/helpers/pipe.helpers';
import { ActionService, GameService } from '@modules/game/services';
import { ModalService } from '@modules/modal/services';
import { DestroyableComponent } from '@shared/destroyable';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'app-game-starting-modal',
    templateUrl: './game-starting-modal.component.html',
    styleUrls: ['./game-starting-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStartingModalComponent extends DestroyableComponent implements OnInit {
    public currentPlayerId: string;
    public timeleft$: Observable<number>;

    constructor(
        private readonly modalRef: BsModalRef,
        private readonly modalService: ModalService,
        private readonly gameService: GameService,
        private readonly actionService: ActionService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.modalService.getHideRequest(GameStartingModalComponent)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => {
                this.modalRef.hide();
            });

        this.gameService.currentPlayer$
            .pipe(
                takeUntil(this.onDestroy),
                tap(player => {
                    this.currentPlayerId = player.id;
                })
            )
            .subscribe();

        this.timeleft$ = this.gameService.readyToStartTimer$
            .pipe(
                takeUntil(this.onDestroy),
                timeLeftPipe()
            );
    }

    public onNotReady(): void {
        this.actionService.applyAction(notReadyPlayerAction(this.currentPlayerId));
    }
}
