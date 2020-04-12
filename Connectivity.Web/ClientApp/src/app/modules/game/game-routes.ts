import { Routes } from '@angular/router';
import { GameSyncComponent } from './components/game-sync/game-sync.component';
import { LobbySetupComponent } from './components/lobby-setup/lobby-setup.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerIdentificationComponent } from './components/player-identification/player-identification.component';
import { GameSessionAuthorizedGuard, GameSessionNotAuthorizedGuard, GameSessionRestoredGuard } from './guards';

export const routes: Routes = [
    { path: 'lobby/setup', component: LobbySetupComponent },
    {
        path: 'lobby/:lobbyId',
        canActivate: [
            GameSessionRestoredGuard
        ],
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
