import { Routes } from '@angular/router';

import { GameFieldComponent } from './components/game-field/game-field.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { LobbyStateComponent } from './components/lobby-state/lobby-state.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerIdentificationComponent } from './components/player-identification/player-identification.component';
import { GameSessionExistsGuard, LobbyExistsGuard } from './guard';

export const routes: Routes = [
    { path: 'lobby/new', component: LobbyCreateComponent, pathMatch: 'full' },
    {
        path: 'lobby/:lobbyId',
        canActivate: [
            LobbyExistsGuard
        ],
        children: [
            {
                path: 'player-identification',
                component: PlayerIdentificationComponent
            },
            {
                path: '',
                component: LobbyStateComponent,
                canActivate: [
                    GameSessionExistsGuard
                ],
                children: [
                    {
                        path: '',
                        component: LobbyComponent
                    },
                    {
                        path: 'game',
                        component: GameFieldComponent
                    }
                ]
            }
        ]
    }
];
