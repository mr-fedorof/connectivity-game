import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy } from '@angular/core';
import { hideTransparentAnimation } from '@shared/animations';
import { GlobalSpinnerService } from '../../services/global-spinner.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
    selector: 'app-global-spinner',
    templateUrl: './global-spinner.component.html',
    styles: [`
        .vs-spinner-overlay {
            position: fixed;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [hideTransparentAnimation()]
})
export class GlobalSpinnerComponent extends SpinnerComponent implements OnDestroy {
    @HostBinding('class.vs-global-spinner') public componentClass = true;

    constructor(
        globalSpinnerService: GlobalSpinnerService
    ) {
        super();

        this.showWhen(globalSpinnerService.shouldShow)
            .subscribe();
    }
}
