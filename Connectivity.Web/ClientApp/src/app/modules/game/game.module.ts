import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import { GameFieldComponent } from './components/game-field/game-field.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { LobbySyncComponent } from './components/lobby-sync/lobby-sync.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerIdentificationComponent } from './components/player-identification/player-identification.component';
import { ActionStateEffects } from './effects/action-state.effects';
import { LobbyEffects } from './effects/lobby.effects';
import { PlayerEffects } from './effects/player.effects';
import { GAME_ENGINE_FEATURE_NAME, gameEngineFeatureReducers } from './game-engine.feature';
import { GameRoutingModule } from './game-routing.module';
import { GameSessionExistsGuard, LobbyExistsGuard } from './guard';
import { FreePlayersPipe } from './pipes/free-players.pipe';
import { TeamPlayersPipe } from './pipes/team-players.pipe';
import { ActionService, GameHubService, GameService, GameSessionStorage, LobbyService, LobbyStorage } from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GameRoutingModule,
        StoreModule.forFeature(GAME_ENGINE_FEATURE_NAME, gameEngineFeatureReducers),
        EffectsModule.forFeature([
            ActionStateEffects,
            LobbyEffects,
            PlayerEffects
        ]),
        SharedModule
    ],
    declarations: [
        GameFieldComponent,
        LobbyCreateComponent,
        LobbyComponent,
        PlayerIdentificationComponent,
        LobbySyncComponent,
        TeamPlayersPipe,
        FreePlayersPipe
    ],
    providers: [
        LobbyService,
        GameHubService,
        GameSessionStorage,
        LobbyStorage,
        LobbyExistsGuard,
        GameSessionExistsGuard,
        GameService,
        ActionService
    ]
})
export class GameModule { }
