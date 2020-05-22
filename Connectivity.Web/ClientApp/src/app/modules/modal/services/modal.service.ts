import { Injectable, Type } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ModalService {
    private readonly _hideRequestSubject: Subject<Type<any>> = new Subject<Type<any>>();

    constructor(
        private readonly bsModalService: BsModalService
    ) {

    }

    public inquiry<T, R>(component: Type<T>, resultFn: (_: T) => R = (() => undefined)): Observable<R> {
        const config: ModalOptions = {
            keyboard: false,
            backdrop: 'static',
        };
        const modalRef: BsModalRef = this.bsModalService.show(component, config);

        return this.bsModalService.onHide
            .pipe(
                map(() => resultFn(modalRef.content))
            );
    }

    public show<T>(component: Type<T>): void {
        const config: ModalOptions = {
            keyboard: false,
            backdrop: 'static',
        };

        this.bsModalService.show(component, config);
    }

    public hide<T>(modalType: Type<T>): void {
        this._hideRequestSubject.next(modalType);
    }

    public getHideRequest<T>(modalType: Type<T>): Observable<void> {
        return this._hideRequestSubject.asObservable()
            .pipe(
                filter(t => t.name === modalType.name),
                map(() => null)
            );
    }
}
