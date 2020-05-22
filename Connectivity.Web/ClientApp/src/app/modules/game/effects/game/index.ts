import { GameCardTaskEffects } from './game-card-task.effects';
import { GameCardEffects } from './game-card.effects';
import { GameDiceEffects } from './game-dice.effects';
import { GamePlayerEffects } from './game-player.effects';
import { GameRisovachEffects } from './game-risovach.effects';
import { GameEffects } from './game.effects';

export const gameEffects = [
    GameEffects,
    GameRisovachEffects,
    GamePlayerEffects,
    GameDiceEffects,
    GameCardEffects,
    GameCardTaskEffects,
];
