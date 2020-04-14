import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GlobalSpinnerService } from '@modules/spinner';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public isReady$: Observable<boolean>;

    constructor(
        private readonly translateService: TranslateService,
        private readonly spinner: GlobalSpinnerService
    ) {
    }

    public ngOnInit(): void {
        this.isReady$ = this.translateService.use(this.translateService.defaultLang)
            .wrapWithSpinner(this.spinner)
            .pipe(
                take(1),
                map(() => true)
            );
    }
}
