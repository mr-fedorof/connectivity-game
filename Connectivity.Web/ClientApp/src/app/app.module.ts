import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@modules/alert/alert.module';
import { AppCoreModule } from '@modules/app-core/app-core.module';
import { LocalizationModule } from '@modules/localization/localization.module';
import { ModalModule } from '@modules/modal/modal.module';
import { SpinnerModule } from '@modules/spinner';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ModalModule as BsModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './modules/app-core/components/app/app.component';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        StoreModule.forRoot({
            router: routerReducer
        }),
        EffectsModule.forRoot([]),
        HttpClientModule,
        SpinnerModule.forRoot(),
        LocalizationModule.forRoot(),
        RouterModule.forRoot([]),
        AppCoreModule,
        AlertModule.forRoot(),
        BsModalModule.forRoot(),
        ModalModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
