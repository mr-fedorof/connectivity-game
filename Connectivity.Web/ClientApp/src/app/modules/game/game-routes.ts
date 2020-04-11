import { Routes } from '@angular/router';

import { LobbySetupComponent } from './components/lobby-setup/lobby-setup.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { GameStateGuard } from './guards/game-state.guard';

export const routes: Routes = [
    { path: 'lobby/setup', component: LobbySetupComponent },
    {
        path: 'lobby/:lobbyId',
        component: LobbyComponent,
        canActivate: [
            GameStateGuard
        ]
    }
];
