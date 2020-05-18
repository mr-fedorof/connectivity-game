import { Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DonateComponent } from './components/donate/donate.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HomeComponent } from './components/home/home.component';
import { RulesComponent } from './components/rules/rules.component';

// TODO: Add error handling
export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'about', component: AboutComponent, pathMatch: 'full' },
    { path: 'contact', component: ContactComponent, pathMatch: 'full' },
    { path: 'donate', component: DonateComponent, pathMatch: 'full' },
    { path: 'feedback', component: FeedbackComponent, pathMatch: 'full' },
    { path: 'rules', component: RulesComponent, pathMatch: 'full' },
    {
        path: '',
        loadChildren: () => import('@modules/game/game.module')
            .then(m => m.GameModule),
    },
    { path: '**', component: HomeComponent },
];
