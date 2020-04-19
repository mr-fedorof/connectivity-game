import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalizationService } from '@modules/localization';
import { GlobalSpinnerService } from '@modules/spinner';
import { Observable } from 'rxjs';
import { shareReplay, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-header'
    }
})
export class HeaderComponent implements OnInit {
    public isExpanded = false;

    public lang$: Observable<string>;

    constructor(
        private readonly localizationService: LocalizationService,
        private readonly spinner: GlobalSpinnerService
    ) {
    }

    public ngOnInit(): void {
        this.lang$ = this.localizationService.lang$
            .pipe(
                startWith(this.localizationService.currentLang),
                shareReplay(1)
            );
    }

    public onLangClick(lang: string): void {
        this.localizationService.use(lang)
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
