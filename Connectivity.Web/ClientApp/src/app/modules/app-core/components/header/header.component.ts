import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalizationService } from '@modules/localization';
import { GlobalSpinnerService } from '@modules/spinner';
import { showHideAnimation } from '@shared/animations';
import { Observable } from 'rxjs';
import { shareReplay, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        showHideAnimation('500ms'),
    ],
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

    public onTogglerClick(): void {
        this.isExpanded = !this.isExpanded;
    }
}
