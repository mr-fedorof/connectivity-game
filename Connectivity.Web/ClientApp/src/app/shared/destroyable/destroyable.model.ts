import { Subject } from 'rxjs';
import { IDestroyable } from './destroyable.interface';

export abstract class Destroyable implements IDestroyable {
    protected onDestroy = new Subject();

    public destroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
