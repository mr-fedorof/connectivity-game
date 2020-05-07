import { ACTION_GUARDS } from '../action-guarding';
import { NextPlayerGameSysActionGuard, StartGameSysActionGuard } from './game-action.guards';

export * from './game-action.guards';

export const actionGuards = [
    { provide: ACTION_GUARDS, useClass: StartGameSysActionGuard, multi: true },
    { provide: ACTION_GUARDS, useClass: NextPlayerGameSysActionGuard, multi: true }
];
