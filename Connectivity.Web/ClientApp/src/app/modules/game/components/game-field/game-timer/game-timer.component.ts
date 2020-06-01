import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { timeLeftOnlySecondsPipe } from '@modules/game/helpers/pipe.helpers';
import { GameTimerService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-game-timer',
    templateUrl: './game-timer.component.html',
    styleUrls: ['./game-timer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTimerComponent extends DestroyableComponent implements OnInit {
    public timeleft$: Observable<number>;

    constructor(
        private readonly gameTimerService: GameTimerService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.timeleft$ = this.gameTimerService.timer$
            .pipe(
                takeUntil(this.onDestroy),
                timeLeftOnlySecondsPipe()
            );
    }
}
