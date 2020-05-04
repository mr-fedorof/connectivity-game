import { ACTION_GUARDS } from '../action-guarding';
import { StartGameActionGuard } from './game-action.guards';

export * from './game-action.guards';

export const actionGuards = [
    { provide: ACTION_GUARDS, useClass: StartGameActionGuard, multi: true }
];
