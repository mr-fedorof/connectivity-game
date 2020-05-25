import { Injectable, Type } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ModalService {
    private readonly _hideRequestSubject: Subject<string> = new Subject<string>();

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

    public show<T>(component: Type<T>, modalOptions?: ModalOptions): BsModalRef {
        const config: ModalOptions = {
            keyboard: false,
            backdrop: 'static',
            ...modalOptions || {},
        };

        return this.bsModalService.show(component, config);
    }

    public hide(typeOrKey: Type<any> | string): void {
        this._hideRequestSubject.next(this.getKey(typeOrKey));
    }

    public getHideRequest(typeOrKey: Type<any> | string): Observable<void> {
        const targetKey = this.getKey(typeOrKey);

        return this._hideRequestSubject.asObservable()
            .pipe(
                filter(key => key === targetKey),
                map(() => null)
            );
    }

    private getKey(typeOrKey: Type<any> | string): string {
        return typeof typeOrKey === 'string'
            ? typeOrKey
            : typeOrKey.name;
    }
}
