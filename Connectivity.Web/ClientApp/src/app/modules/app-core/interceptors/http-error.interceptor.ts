import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { GlobalAlertService } from '@modules/alert/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private readonly injector: Injector
    ) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(
                    error => {
                        const globalAlertService = this.injector.get(GlobalAlertService);

                        globalAlertService.somethingWentWrong();

                        return throwError({ ...error, isNotified: true });
                    })
            );
    }
}
