import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { LobbySetupComponent } from './components/lobby-setup/lobby-setup.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { MasterComponent } from './components/master/master.component';
import { LobbyEffects } from './effects/lobby.effects';
import { gameEngineFeatureReducers, GAME_ENGINE_FEATURE_NAME } from './game-engine.feature';
import { GameRoutingModule } from './game-routing.module';
import { GameHubService, GameNavigationService, LobbyService } from './services';

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
        LobbyComponent,
        LobbySetupComponent,
        MasterComponent
    ],
    providers: [
        LobbyService,
        GameNavigationService,
        GameHubService
    ]
})
export class GameModule { }
