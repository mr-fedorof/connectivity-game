import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEngineFeatureName, gameEngineFeatureReducers } from './game-engine.feature';
import { LobbyEffects } from './effects/lobby.effects';
import { LobbyService } from './services';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LobbySetupComponent } from './components/lobby-setup/lobby-setup.component';
import { MasterComponent } from './components/master/master.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GameRoutingModule,
        StoreModule.forFeature(GameEngineFeatureName, gameEngineFeatureReducers),
        EffectsModule.forFeature([
            LobbyEffects,
        ]),
    ],
    declarations: [
        GameFieldComponent,
        LobbyComponent,
        LobbySetupComponent,
        MasterComponent
    ],
    providers: [
        LobbyService,
    ]
})
export class GameModule { }
