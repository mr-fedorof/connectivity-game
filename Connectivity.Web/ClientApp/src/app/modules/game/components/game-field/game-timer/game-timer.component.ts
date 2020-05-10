import { Component, OnInit } from '@angular/core';
import { GameTimerService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-game-timer',
    templateUrl: './game-timer.component.html',
    styleUrls: ['./game-timer.component.scss']
})
export class GameTimerComponent extends DestroyableComponent implements OnInit {
    public timeleft$: Observable<number>;

    constructor(
        private readonly gameTimerService: GameTimerService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.timeleft$ = this.gameTimerService.timeleft$;
    }
}
