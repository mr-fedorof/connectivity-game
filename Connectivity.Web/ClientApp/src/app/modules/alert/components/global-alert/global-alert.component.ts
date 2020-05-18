import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { AlertType } from '@modules/alert/enums';
import { GlobalAlertService } from '@modules/alert/services/global-alert.service';
import { showHideAnimation } from '@shared/animations';
import { DestroyableComponent } from '@shared/destroyable';
import { timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Alert } from '../../models';

@Component({
    selector: 'app-global-alert',
    templateUrl: './global-alert.component.html',
    styleUrls: ['./global-alert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        showHideAnimation(),
    ],
})
export class GlobalAlertComponent extends DestroyableComponent {
    public showHideTrigger = false;
    public alert: Alert | null;

    @HostBinding('@showHide') public get showHide(): string {
        return this.showHideTrigger ? 'show' : 'hide';
    }

    @HostBinding('class.error') public get errorTypeClass(): boolean {
        return this.alert?.type === AlertType.Error;
    }

    @HostBinding('class.info') public get infoTypeClass(): boolean {
        return this.alert?.type === AlertType.Info;
    }

    @HostBinding('class.warning') public get warningTypeClass(): boolean {
        return this.alert?.type === AlertType.Warning;
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

                if (alert.time > 0) {
                    timer(alert.time)
                        .pipe(
                            takeUntil(this.onDestroy),
                            take(1)
                        )
                        .subscribe(() => {
                            if (this.alert?.id === alert.id) {
                                this.showHideTrigger = false;
                                this.cdr.markForCheck();
                            }
                        });

                }
            });

        this.globalAlertService.clear$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(id => {
                if (!id || this.alert?.id === id) {
                    this.showHideTrigger = false;
                }

                this.cdr.markForCheck();
            });
    }

    public onHideClick(): void {
        this.globalAlertService.clearAlert();
    }
}
