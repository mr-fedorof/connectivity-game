import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export class DestroyableService implements OnDestroy, OnInit {
    public onDestroy = new Subject();

    public ngOnDestroy(): void {
        this.onDestroy.next();
    }

    public ngOnInit(): void {
        this.onDestroy = new Subject();
    }
}
