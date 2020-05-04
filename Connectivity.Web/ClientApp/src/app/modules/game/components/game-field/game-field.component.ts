import { Component, OnInit } from '@angular/core';
import { rollDicePlayerAction, takeCardPlayerAction } from '@modules/game/actions';
import { Player, Team } from '@modules/game/models';
import { diceValueSelector } from '@modules/game/selectors/game.selectors';
import { isProcessingSelector } from '@modules/game/selectors/lobby-state.selectors';
import { playersSelector, teamsSelector } from '@modules/game/selectors/lobby.selectors';
import { ActionService, GameService } from '@modules/game/services';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.scss'],
})
export class GameFieldComponent implements OnInit {
    public currentPlayer: Player;

    public currentPlayer$: Observable<Player>;
    public teams$: Observable<Team[]>;
    public players$: Observable<Player[]>;
    public currentPlayerTurn$: Observable<boolean>;
    public isProcessing$: Observable<boolean>;
    public diceValue$: Observable<number>;

    public timeLeft: Subject<string>;

    constructor(
        private readonly store: Store,
        private readonly gameService: GameService,
        private readonly actionService: ActionService
    ) {
        this.timeLeft = new Subject<string>();
    }

    public ngOnInit(): void {
        this.currentPlayer$ = this.gameService.currentPlayer$;
        this.teams$ = this.store.select(teamsSelector);
        this.players$ = this.store.select(playersSelector);
        this.currentPlayerTurn$ = this.gameService.currentPlayerTurn$;
        this.isProcessing$ = this.store.select(isProcessingSelector);
        this.diceValue$ = this.store.select(diceValueSelector);

        this.currentPlayer$
            .pipe(tap(player => this.currentPlayer = player))
            .subscribe();

        this.startTime();
    }

    public onRollDiceClick(): void {
        this.actionService.applyAction(rollDicePlayerAction());
    }

    public onTakeCardClick(): void {
        this.actionService.applyAction(takeCardPlayerAction());
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
