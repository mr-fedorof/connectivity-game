import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class DestroyableService implements OnDestroy {
    protected onDestroy = new Subject();

    public ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
