import { ActionGuardService } from './action-guard.service';

export * from './action-guard.interface';
export * from './action-guard.service';
export * from './action-guards.token';

export const actionGuardingProviders = [
    ActionGuardService
];
