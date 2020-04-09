import { Subject } from 'rxjs';
import { IDestroyable } from './destroyable.interface';

export abstract class Destroyable implements IDestroyable {
    protected onDestroy = new Subject();

    destroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
