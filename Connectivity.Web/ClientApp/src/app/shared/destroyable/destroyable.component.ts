import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class DestroyableComponent implements OnDestroy {
    protected onDestroy = new Subject();

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
