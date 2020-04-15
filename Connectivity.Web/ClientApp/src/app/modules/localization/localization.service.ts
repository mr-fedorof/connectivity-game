import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class LocalizationService {
    public readonly lang$: Observable<string>;

    public get currentLang(): string {
        return this.translateService.currentLang;
    }

    constructor(
        private readonly translateService: TranslateService
    ) {
        this.lang$ = this.translateService.onLangChange
            .pipe(
                map(e => e.lang),
                shareReplay(1)
            );
    }

    public use(lang?: string): Observable<any> {
        if (!lang) {
            lang = this.getLang();
        }

        this.saveLang(lang);

        return this.translateService.use(lang);
    }

    private getLang(): string {
        const lang = localStorage.getItem('game-lang');

        return lang || this.translateService.defaultLang;
    }

    private saveLang(lang: string): void {
        localStorage.setItem('game-lang', lang);
    }
}
