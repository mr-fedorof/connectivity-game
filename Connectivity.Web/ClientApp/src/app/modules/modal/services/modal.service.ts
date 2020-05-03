import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ModalService {
    constructor(
        private readonly bsModalService: BsModalService
    ) {

    }

    public show(component: any, resultFn: (_: any) => any = (() => undefined)): Observable<any> {
        const config: ModalOptions = {};
        const modalRef: BsModalRef = this.bsModalService.show(component, config);

        return this.bsModalService.onHide
            .pipe(
                map(() => resultFn(modalRef.content))
            );
    }
}
