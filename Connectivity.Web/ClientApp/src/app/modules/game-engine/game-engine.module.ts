import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { gameFeatureReducers, GameFeatureName } from './game.feature';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './effects/game.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(GameFeatureName, gameFeatureReducers),
        EffectsModule.forFeature([
            GameEffects,
        ]),
    ],
})
export class GameEngineModule { }
