import { Routes } from '@angular/router';

import { GameSyncComponent } from './components/game-sync/game-sync.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerIdentificationComponent } from './components/player-identification/player-identification.component';
import { GameSessionAuthorizedGuard, GameSessionNotAuthorizedGuard } from './guards';

export const routes: Routes = [
    { path: 'lobby', component: LobbyCreateComponent },
    {
        path: 'lobby/:lobbyId',
        component: GameSyncComponent,
        children: [
            {
                path: '',
                component: LobbyComponent,
                canActivate: [
                    GameSessionAuthorizedGuard
                ]
            },
            {
                path: 'player-identification',
                component: PlayerIdentificationComponent,
                canActivate: [
                    GameSessionNotAuthorizedGuard
                ]
            }
        ]
    }
];
