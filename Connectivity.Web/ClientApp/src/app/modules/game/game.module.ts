import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import { GameCardComponent } from './components/game-field/game-card/game-card.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameMessagesComponent } from './components/game-field/game-messages/game-messages.component';
import { GameTilesComponent } from './components/game-field/game-tiles/game-tiles.component';
import { TeamInfoComponent } from './components/game-field/team-info/team-info.component';
import { TeamsComponent } from './components/game-field/teams/teams.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { LobbyStateComponent } from './components/lobby-state/lobby-state.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerIdentificationComponent } from './components/player-identification/player-identification.component';
import { GameEffects } from './effects/game.effects';
import { LobbyStateEffects } from './effects/lobby-state.effects';
import { LobbyEffects } from './effects/lobby.effects';
import { PlayerEffects } from './effects/player.effects';
import { GAME_ENGINE_FEATURE_NAME, gameEngineFeatureReducers } from './game-engine.feature';
import { GameRoutingModule } from './game-routing.module';
import { GameSessionExistsGuard, LobbyExistsGuard } from './guard';
import { LobbyStateInitializedGuard } from './guard/lobby-state-initialized.guard';
import { FreePlayersPipe } from './pipes/free-players.pipe';
import { TeamPlayersPipe } from './pipes/team-players.pipe';
import {
    ActionService,
    GameHubService,
    GameService,
    GameSessionStorage,
    LobbyService,
    LobbyStorage,
    PendingActionsStorage,
} from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GameRoutingModule,
        StoreModule.forFeature(GAME_ENGINE_FEATURE_NAME, gameEngineFeatureReducers),
        EffectsModule.forFeature([
            LobbyStateEffects,
            LobbyEffects,
            PlayerEffects,
            GameEffects
        ]),
        SharedModule
    ],
    declarations: [
        GameFieldComponent,
        LobbyCreateComponent,
        LobbyComponent,
        PlayerIdentificationComponent,
        LobbyStateComponent,
        TeamPlayersPipe,
        FreePlayersPipe,
        GameMessagesComponent,
        TeamsComponent,
        GameTilesComponent,
        GameCardComponent,
        TeamInfoComponent
    ],
    providers: [
        LobbyService,
        GameHubService,
        GameSessionStorage,
        LobbyStorage,
        LobbyExistsGuard,
        GameSessionExistsGuard,
        GameService,
        ActionService,
        LobbyStateInitializedGuard,
        PendingActionsStorage
    ]
})
export class GameModule { }
