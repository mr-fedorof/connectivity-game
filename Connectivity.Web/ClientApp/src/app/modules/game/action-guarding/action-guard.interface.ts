import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface IActionGuard {
    actionType: string;
    canActivate(action: Action): Observable<boolean>;
}
