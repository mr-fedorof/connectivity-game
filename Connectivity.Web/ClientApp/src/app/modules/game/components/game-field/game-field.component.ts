import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.scss'],
})
export class GameFieldComponent {
    public timeLeft: Subject<string>;

    constructor() {
        this.timeLeft = new Subject<string>();
    }

    ngOnInit(): void {
        this.startTime();
    }

    private checkTime(i): number {
        if (i < 10) { i = "0" + i };
        return i;
    }

    public startTime(): void {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);
        this.timeLeft.next(h + ":" + m + ":" + s);
        setTimeout(() => this.startTime(), 500);
    }

}
