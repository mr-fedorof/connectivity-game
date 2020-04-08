import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameEngineModule } from '../game-engine/game-engine.module';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameService } from './services';
import { GAME_SERVICE_TOKEN } from '@modules/game-engine/services';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GameRoutingModule,
        GameEngineModule,
    ],
    declarations: [
        GameFieldComponent
    ],
    providers: [
        { provide: GAME_SERVICE_TOKEN, useClass: GameService },
    ]
})
export class GameModule { }
