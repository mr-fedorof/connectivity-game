import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-core-routing.module';
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './components/app/app.component';
import { ContactComponent } from './components/contact/contact.component';
import { DonateComponent } from './components/donate/donate.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RulesComponent } from './components/rules/rules.component';
import { NavigationService } from './services';

@NgModule({
    imports: [
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        RulesComponent,
        AboutComponent,
        FeedbackComponent,
        ContactComponent,
        DonateComponent
    ],
    providers: [
        NavigationService
    ],
    exports: [
        AppComponent
    ]
})
export class AppCoreModule { }
