import { Injectable, Type } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ModalService {
    constructor(
        private readonly bsModalService: BsModalService
    ) {

    }

    public inquiry<T, R>(component: Type<T>, resultFn: (_: T) => R = (() => undefined)): Observable<R> {
        const config: ModalOptions = {
            keyboard: false,
            backdrop: 'static'
        };
        const modalRef: BsModalRef = this.bsModalService.show(component, config);

        return this.bsModalService.onHide
            .pipe(
                map(() => resultFn(modalRef.content))
            );
    }
}
