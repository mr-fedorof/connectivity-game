import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GlobalSpinnerComponent } from './components/global-spinner/global-spinner.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GlobalSpinnerService } from './services/global-spinner.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SpinnerComponent,
        GlobalSpinnerComponent,
    ],
    exports: [
        SpinnerComponent,
        GlobalSpinnerComponent,
    ],
})
export class SpinnerModule {
    public static forRoot(config?: any): ModuleWithProviders {
        return {
            ngModule: SpinnerModule,
            providers: [
                GlobalSpinnerService,
            ],
        };
    }
}
