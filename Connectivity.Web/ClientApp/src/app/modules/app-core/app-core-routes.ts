import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: '',
        loadChildren: () => import('@modules/game/game.module')
            .then(m => m.GameModule)
    }
];
