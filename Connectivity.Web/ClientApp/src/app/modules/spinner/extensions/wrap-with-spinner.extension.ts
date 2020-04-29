import { Observable } from 'rxjs';
import { ISpinner } from '../models/spinner.interface';

declare module 'rxjs/internal/Observable' {
  // tslint:disable-next-line: interface-name
  interface Observable<T> {
    wrapWithSpinner<T>(this: Observable<T>, spinner: ISpinner): Observable<T>;
  }
}

function wrapWithSpinner<T>(this: Observable<T>, spinner: ISpinner): Observable<T> {
  return spinner.wrap(this);
}

Observable.prototype.wrapWithSpinner = wrapWithSpinner;
