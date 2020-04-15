import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameSyncComponent } from './components/game-sync/game-sync.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerIdentificationComponent } from './components/player-identification/player-identification.component';
import { LobbyEffects } from './effects/lobby.effects';
import { GAME_ENGINE_FEATURE_NAME, gameEngineFeatureReducers } from './game-engine.feature';
import { GameRoutingModule } from './game-routing.module';
import { GameSessionAuthorizedGuard, GameSessionNotAuthorizedGuard } from './guards';
import { GameHubService, GameSessionService, LobbyService } from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GameRoutingModule,
        StoreModule.forFeature(GAME_ENGINE_FEATURE_NAME, gameEngineFeatureReducers),
        EffectsModule.forFeature([
            LobbyEffects
        ]),
        SharedModule
    ],
    declarations: [
        GameFieldComponent,
        LobbyCreateComponent,
        LobbyComponent,
        PlayerIdentificationComponent,
        GameSyncComponent
    ],
    providers: [
        LobbyService,
        GameHubService,
        GameSessionAuthorizedGuard,
        GameSessionNotAuthorizedGuard,
        GameSessionService
    ]
})
export class GameModule { }
