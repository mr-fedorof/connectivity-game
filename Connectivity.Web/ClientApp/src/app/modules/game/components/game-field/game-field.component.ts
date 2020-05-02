import { Component, OnInit } from '@angular/core';
import { Player, Team } from '@modules/game/models';
import { playersSelector, teamsSelector } from '@modules/game/selectors/lobby.selectors';
import { GameService } from '@modules/game/services';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.scss'],
})
export class GameFieldComponent implements OnInit {
    public teams$: Observable<Team[]>;
    public players$: Observable<Player[]>;
    public currentPlayerTurn$: Observable<boolean>;

    public timeLeft: Subject<string>;

    constructor(
        private readonly store: Store,
        private readonly gameService: GameService
    ) {
        this.timeLeft = new Subject<string>();
    }

    public ngOnInit(): void {
        this.teams$ = this.store.select(teamsSelector);
        this.players$ = this.store.select(playersSelector);
        this.currentPlayerTurn$ = this.gameService.currentPlayerTurn$;

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
