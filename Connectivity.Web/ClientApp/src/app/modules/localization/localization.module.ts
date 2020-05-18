import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ILocalizationModuleConfig } from './localization-module-config.interface';
import { LocalizationService } from './localization.service';
import { translateHttpLoaderFactory } from './translate-http-loader.factory';

@NgModule({
    imports: [
        TranslateModule,
    ],
    exports: [
        TranslateModule,
    ],
})
export class LocalizationModule {
    public static forRoot(config?: ILocalizationModuleConfig): ModuleWithProviders<LocalizationModule> {
        return {
            ngModule: LocalizationModule,
            providers: [
                ...TranslateModule.forRoot({
                    defaultLanguage: 'en',
                    loader: {
                        provide: TranslateLoader,
                        useFactory: translateHttpLoaderFactory,
                        deps: [HttpClient],
                    },
                    ...config || {},
                }).providers,
                LocalizationService,
            ],
        };
    }
}
