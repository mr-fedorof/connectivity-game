import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { GlobalAlertService } from '@modules/alert/services/global-alert.service';
import { showHideAnimation } from '@shared/animations';
import { DestroyableComponent } from '@shared/destroyable';
import { takeUntil } from 'rxjs/operators';

import { Alert } from '../../models';

@Component({
    selector: 'app-global-alert',
    templateUrl: './global-alert.component.html',
    styleUrls: ['./global-alert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        showHideAnimation()
    ]
})
export class GlobalAlertComponent extends DestroyableComponent {
    public showHideTrigger = false;
    public alert: Alert | null;

    @HostBinding('@showHide') public get showHide(): string {
        return this.showHideTrigger ? 'show' : 'hide';
    }

    constructor(
        private readonly globalAlertService: GlobalAlertService,
        private readonly cdr: ChangeDetectorRef
    ) {
        super();

        this.globalAlertService.alert$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(alert => {
                if (alert !== null) {
                    this.alert = alert;
                }

                this.showHideTrigger = !!alert;

                this.cdr.markForCheck();
            });
    }

    public onHideClick(): void {
        this.globalAlertService.clearAlert();
    }
}
