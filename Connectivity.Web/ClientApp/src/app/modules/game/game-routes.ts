import { Routes } from '@angular/router';

import { LobbySetupComponent } from './components/lobby-setup/lobby-setup.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { MasterComponent } from './components/master/master.component';

export const routes: Routes = [
    {
        path: '',
        component: MasterComponent,
        children: [
            { path: 'lobby/setuping', component: LobbySetupComponent },
            { path: 'lobby', component: LobbyComponent },
        ]
    },
];
