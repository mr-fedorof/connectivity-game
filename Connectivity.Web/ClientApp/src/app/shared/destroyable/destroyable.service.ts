import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export class DestroyableService implements OnDestroy, OnInit {
    protected onDestroy = new Subject();

    public ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    public ngOnInit(): void {
        this.onDestroy = new Subject();
    }
}
