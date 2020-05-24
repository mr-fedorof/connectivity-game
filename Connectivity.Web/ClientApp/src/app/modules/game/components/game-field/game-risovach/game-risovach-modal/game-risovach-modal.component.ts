import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { drawingEndPlayerAction } from '@modules/game/actions';
import { ActionService, GameService } from '@modules/game/services';
import { ModalService } from '@modules/modal/services';
import { DestroyableComponent } from '@shared/destroyable';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'app-game-risovach-modal',
    templateUrl: './game-risovach-modal.component.html',
    styleUrls: ['./game-risovach-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRisovachModalComponent extends DestroyableComponent implements OnInit {
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
        this.modalService.getHideRequest(GameRisovachModalComponent)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => {
                this.modalRef.hide();
            });
    }

    close(): void {
        this.actionService.applyAction(drawingEndPlayerAction());

    }
}
