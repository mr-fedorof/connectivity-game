import { InjectionToken } from '@angular/core';

import { IActionGuard } from './action-guard.interface';

export const ACTION_GUARDS = new InjectionToken<Array<IActionGuard>>('ACTION_GUARDS');
