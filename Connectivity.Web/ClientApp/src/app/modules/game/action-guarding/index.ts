import { ActionGuardService } from './action-guard.service';

export * from './action-guard.interface';
export * from './action-guard.service';
export * from './action-guard.token';

export const actionGuardingProviders = [
    ActionGuardService
];
