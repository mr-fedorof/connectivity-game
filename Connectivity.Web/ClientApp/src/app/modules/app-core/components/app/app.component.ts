import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LocalizationService } from '@modules/localization';
import { GlobalSpinnerService } from '@modules/spinner';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public isReady$: Observable<boolean>;
    public isNavigationPending$: Observable<boolean>;

    constructor(
        private readonly localizationService: LocalizationService,
        private readonly spinner: GlobalSpinnerService,
        private readonly router: Router
    ) {
    }

    public ngOnInit(): void {
        this.isReady$ = this.localizationService.use()
            .wrapWithSpinner(this.spinner)
            .pipe(
                take(1),
                map(() => true)
            );

        this.isNavigationPending$ = this.router.events
            .pipe(
                filter((event: RouterEvent) => this.isConsideredEvent(event)),
                map((event: RouterEvent) => this.isNavigationStart(event)),
                distinctUntilChanged()
            );

        this.spinner.showWhen(this.isNavigationPending$)
            .subscribe();
    }

    private isConsideredEvent(event: RouterEvent): boolean {
        return this.isNavigationStart(event)
            || this.isNavigationEnd(event);
    }

    private isNavigationStart(event: RouterEvent): boolean {
        return event instanceof NavigationStart;
    }

    private isNavigationEnd(event: RouterEvent): boolean {
        return event instanceof NavigationEnd
            || event instanceof NavigationCancel
            || event instanceof NavigationError;
    }
}
