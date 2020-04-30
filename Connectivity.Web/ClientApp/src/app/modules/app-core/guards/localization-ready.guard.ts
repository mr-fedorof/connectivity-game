import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { LocalizationService } from '@modules/localization';
import { GlobalSpinnerService } from '@modules/spinner';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class LocalizationReadyGuard implements CanActivate {
    constructor(
        private readonly localizationService: LocalizationService,
        private readonly globalSpinnerService: GlobalSpinnerService
    ) {
    }

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isReady$ = this.localizationService.use()
            .wrapWithSpinner(this.globalSpinnerService)
            .pipe(
                take(1),
                map(() => true)
            );

        return isReady$;
    }
}
