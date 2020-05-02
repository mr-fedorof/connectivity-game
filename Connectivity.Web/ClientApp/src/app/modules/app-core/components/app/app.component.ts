import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LocalizationReadyGuard } from '@modules/app-core/guards';
import { GlobalSpinnerService } from '@modules/spinner';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public isReady$: Observable<boolean>;
    public isNavigationPending$: Observable<boolean>;

    constructor(
        private readonly localizationReadyGuard: LocalizationReadyGuard,
        private readonly spinner: GlobalSpinnerService,
        private readonly router: Router
    ) {
    }

    public ngOnInit(): void {
        this.isReady$ = this.localizationReadyGuard.canActivate();

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
