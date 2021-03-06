import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import { actionGuardingProviders } from './action-guarding';
import { actionGuards } from './action-guards';
import { GameActionsComponent } from './components/game-field/game-actions/game-actions.component';
import { GameCardDeckComponent } from './components/game-field/game-card-deck/game-card-deck.component';
import { GameCardStateComponent } from './components/game-field/game-card-state/game-card-state.component';
import { GameCardBackComponent } from './components/game-field/game-card/game-card-back/game-card-back.component';
import { GameCardTaskComponent } from './components/game-field/game-card/game-card-task/game-card-task.component';
import { GameCardComponent } from './components/game-field/game-card/game-card.component';
import { GameDiceComponent } from './components/game-field/game-dice/game-dice.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameMessagesComponent } from './components/game-field/game-messages/game-messages.component';
import {
    GameRisovachModalComponent,
} from './components/game-field/game-risovach/game-risovach-modal/game-risovach-modal.component';
import { GameRisovachComponent } from './components/game-field/game-risovach/game-risovach.component';
import { GameTeamsComponent } from './components/game-field/game-teams/game-teams.component';
import { GameTilesComponent } from './components/game-field/game-tiles/game-tiles.component';
import { GameTimerComponent } from './components/game-field/game-timer/game-timer.component';
import { LobbyCreateComponent } from './components/lobby-create/lobby-create.component';
import { LobbyStateComponent } from './components/lobby-state/lobby-state.component';
import { GameStartingModalComponent } from './components/lobby/game-starting-modal/game-starting-modal.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerIdentificationComponent } from './components/player-identification/player-identification.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { gameEngineEffects } from './effects';
import { GAME_ENGINE_FEATURE_NAME, gameEngineFeatureReducers } from './game-engine.feature';
import { GameRoutingModule } from './game-routing.module';
import { GameSessionExistsGuard, LobbyExistsGuard } from './guard';
import { LobbyStateInitializedGuard } from './guard/lobby-state-initialized.guard';
import { FreePlayersPipe } from './pipes/free-players.pipe';
import { GameCardNamePipe } from './pipes/game-card-name.pipe';
import { GameCardTaskNamePipe } from './pipes/game-card-task-name.pipe';
import { TeamPlayersPipe } from './pipes/team-players.pipe';
import {
    ActionService,
    GameCardService,
    GameDialogService,
    GameDiceService,
    GameHubService,
    GameMessageService,
    GameService,
    GameSessionStorage,
    GameTimerService,
    LobbyService,
    LobbyStorage,
    PendingActionsStorage,
} from './services';
import { GameRisovachService } from './services/game-risovach.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GameRoutingModule,
        StoreModule.forFeature(GAME_ENGINE_FEATURE_NAME, gameEngineFeatureReducers),
        EffectsModule.forFeature(gameEngineEffects),
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
        GameCardDeckComponent,
        GameActionsComponent,
        GameTimerComponent,
        GameStartingModalComponent,
        GameCardTaskComponent,
        GameCardBackComponent,
        GameCardStateComponent,
        GameRisovachModalComponent,
        GameCardNamePipe,
        GameCardTaskNamePipe,
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
        GameDialogService,
        ...actionGuardingProviders,
        ...actionGuards,
    ],
})
export class GameModule { }
