import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { timeLeftPipe } from '@modules/game/helpers/pipe.helpers';
import { GameTimerService } from '@modules/game/services';
import { ModalService } from '@modules/modal/services';
import { DestroyableComponent } from '@shared/destroyable';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-game-risovach-modal',
    templateUrl: './game-risovach-modal.component.html',
    styleUrls: ['./game-risovach-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRisovachModalComponent extends DestroyableComponent implements OnInit {
    public timeleft$: Observable<{ timeleft: number, timeleftInPerc: number }>;

    constructor(
        private readonly modalRef: BsModalRef,
        private readonly modalService: ModalService,
        private readonly gameTimerService: GameTimerService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.modalService.getHideRequest(GameRisovachModalComponent)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => {
                this.modalRef.hide();
            });

        this.timeleft$ = this.gameTimerService.timer$
            .pipe(
                takeUntil(this.onDestroy),
                timeLeftPipe(),
                map(([startedAt, timespan, timeleft]) => ({
                    timeleft,
                    timeleftInPerc: timeleft / timespan * 100,
                }))
            );
    }
}
