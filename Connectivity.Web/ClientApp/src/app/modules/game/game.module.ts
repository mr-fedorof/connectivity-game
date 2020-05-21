import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import { actionGuardingProviders } from './action-guarding';
import { actionGuards } from './action-guards';
import {
    CardResultConfirmationModalComponent,
} from './components/game-field/card-result-confirmation-modal/card-result-confirmation-modal.component';
import { GameActionsComponent } from './components/game-field/game-actions/game-actions.component';
import { GameCardDeckComponent } from './components/game-field/game-card-deck/game-card-deck.component';
import { GameCardComponent } from './components/game-field/game-card/game-card.component';
import { GameDiceComponent } from './components/game-field/game-dice/game-dice.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameMessagesComponent } from './components/game-field/game-messages/game-messages.component';
import { GameRisovachComponent } from './components/game-field/game-risovach/game-risovach.component';
import { GameTeamsComponent } from './components/game-field/game-teams/game-teams.component';
import { GameTilesComponent } from './components/game-field/game-tiles/game-tiles.component';
import { GameTimerComponent } from './components/game-field/game-timer/game-timer.component';
import { TeamInfoComponent } from './components/game-field/team-info/team-info.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { LobbyStateComponent } from './components/lobby-state/lobby-state.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerIdentificationComponent } from './components/player-identification/player-identification.component';
import { GameCardTaskEffects } from './effects/game/game-card-task.effects';
import { GameCardEffects } from './effects/game/game-card.effects';
import { GameDiceEffects } from './effects/game/game-dice.effects';
import { GamePlayerEffects } from './effects/game/game-player.effects';
import { GameEffects } from './effects/game/game.effects';
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
    GameCardService,
    GameDiceService,
    GameHubService,
    GameMessageService,
    GameRisovachService,
    GameService,
    GameSessionStorage,
    GameTimerService,
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
            GameEffects,
            GamePlayerEffects,
            GameDiceEffects,
            GameCardEffects,
            GameCardTaskEffects,
        ]),
        SharedModule,
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
        GameRisovachComponent,
        GameTeamsComponent,
        GameTilesComponent,
        GameCardComponent,
        TeamInfoComponent,
        GameDiceComponent,
        CardResultConfirmationModalComponent,
        GameCardDeckComponent,
        GameActionsComponent,
        GameTimerComponent,
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
        PendingActionsStorage,
        GameDiceService,
        GameCardService,
        GameTimerService,
        GameMessageService,
        GameRisovachService,
        ...actionGuardingProviders,
        ...actionGuards,
    ],
})
export class GameModule { }
