import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-core-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    imports: [
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent
    ],
    exports: [
        AppComponent
    ]
})
export class AppCoreModule { }
