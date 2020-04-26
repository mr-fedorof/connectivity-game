import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { GlobalAlertService } from './services/global-alert.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GlobalAlertComponent
    ],
    exports: [
        GlobalAlertComponent
    ]
})
export class AlertModule {
    public static forRoot(): ModuleWithProviders<AlertModule> {
        return {
            ngModule: AlertModule,
            providers: [
                GlobalAlertService
            ]
        };
    }
}
