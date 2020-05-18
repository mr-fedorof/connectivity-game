import { NgModule } from '@angular/core';
import { AlertModule } from '@modules/alert/alert.module';
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
import { LocalizationReadyGuard } from './guards';
import { NavigationService } from './services';

@NgModule({
    imports: [
        AppRoutingModule,
        SharedModule,
        AlertModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        RulesComponent,
        AboutComponent,
        FeedbackComponent,
        ContactComponent,
        DonateComponent,
    ],
    providers: [
        NavigationService,
        LocalizationReadyGuard,
    ],
    exports: [
        AppComponent,
    ],
})
export class AppCoreModule { }
