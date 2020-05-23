import { gameEffects } from './game';
import { LobbyStateEffects } from './lobby-state.effects';
import { LobbyEffects } from './lobby.effects';
import { PlayerEffects } from './player.effects';

export const gameEngineEffects = [
    LobbyStateEffects,
    LobbyEffects,
    PlayerEffects,
    ...gameEffects,
];
