import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player, GameConfig } from '@modules/game-engine/models';
import { playersSelector } from '@modules/game-engine/selectors/player.selectors';
import { GameFeature } from '@modules/game-engine';
import { GameStatus } from '@modules/game-engine/enums';
import { gameStatusSelector, gameIdSelector } from '@modules/game-engine/selectors/game.selectors';

import * as PlayerActions from '@modules/game-engine/actions/player.actions';
import * as GameActions from '@modules/game-engine/actions/game.actions';
import { GameState } from '@modules/game-engine/states';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {
    public readonly gameId$: Observable<string>;
    public readonly players$: Observable<Player[]>;
    public readonly gameStatus$: Observable<GameStatus>;

    public gameId: string;
    public player: Player = new Player();

    constructor(
        private readonly store: Store<GameFeature>
    ) {
        this.players$ = this.store.pipe(select(playersSelector));
        this.gameStatus$ = this.store.pipe(select(gameStatusSelector));
        this.gameId$ = this.store.pipe(select(gameIdSelector));
    }

    ngOnInit(): void {
        this.store.dispatch(GameActions.initGame(new GameConfig()));

        this.gameId$.subscribe((gameId: string) => {
            this.gameId = gameId;
        });
    }

    public addPlayerClick() {
        this.store.dispatch(PlayerActions.joinPlayer(this.gameId, this.player));

        this.player = new Player();
    }
}
