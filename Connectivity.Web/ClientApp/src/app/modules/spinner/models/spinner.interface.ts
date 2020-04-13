import { Observable } from 'rxjs';

export interface ISpinner {
    isShown: boolean;

    show(): void;

    hide(): void;

    /**
     * Shows the spinner as soon as the @param observable is subscribed to,
     * and then hides the spinner when the inner observable completes or errors
     */
    wrap<T>(observable: Observable<T>): Observable<T>;

    /**
     * Shows the spinner as soon as @param shouldShow$ emits true,
     * and then hides the spinner when false is emitted
     */
    showWhen(shouldShow$: Observable<boolean>): Observable<boolean>;
}
