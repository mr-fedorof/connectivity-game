import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalService } from '@modules/modal/services';
import { DestroyableComponent } from '@shared/destroyable';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-game-risovach-modal',
    templateUrl: './game-risovach-modal.component.html',
    styleUrls: ['./game-risovach-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRisovachModalComponent extends DestroyableComponent implements OnInit {
    constructor(
        private readonly modalRef: BsModalRef,
        private readonly modalService: ModalService
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
}
