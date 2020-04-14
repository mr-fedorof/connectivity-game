import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GlobalSpinnerService } from '@modules/spinner';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public isExpanded = false;

    public lang$: Observable<string>;

    constructor(
        private readonly translateService: TranslateService,
        private readonly spinner: GlobalSpinnerService
    ) {
    }

    public ngOnInit(): void {
        this.lang$ = this.translateService.onLangChange
            .pipe(
                map(e => e.lang),
                startWith(this.translateService.currentLang),
                shareReplay(1)
            );
    }

    public onLangClick(lang: string): void {
        this.translateService.use(lang)
            .wrapWithSpinner(this.spinner)
            .subscribe();
    }

    public collapse(): void {
        this.isExpanded = false;
    }

    public toggle(): void {
        this.isExpanded = !this.isExpanded;
    }
}
