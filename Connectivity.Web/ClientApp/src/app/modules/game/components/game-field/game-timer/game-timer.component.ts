import { Component, OnInit } from '@angular/core';
import { GameTimerService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { diffInSec } from '@shared/utils/date.utils';
import { EMPTY, Observable, pipe, timer } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil, takeWhile } from 'rxjs/operators';

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
        this.timeleft$ = this.gameTimerService.timer$
            .pipe(
                takeUntil(this.onDestroy),
                filter(([startedAt, timespan]) => !!startedAt && timespan > 0),
                this.timeLeftPipe,
                startWith(0)
            );
    }

    private readonly timeLeftPipe = pipe(
        switchMap(([startedAt, timespan]: [string, number]) => {
            const startedDiff = diffInSec(new Date(), startedAt);

            if (startedDiff > timespan) {
                return EMPTY;
            }

            return timer(0, 1000)
                .pipe(
                    map(i => startedDiff + i),
                    map(diff => timespan - diff),
                    takeWhile(timeleft => timeleft >= 0)
                );
        })
    );
}
