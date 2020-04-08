import { Component } from '@angular/core';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent {
    // public readonly gameId$: Observable<string>;
    // public readonly players$: Observable<Player[]>;
    // public readonly gameStatus$: Observable<GameStatus>;

    // public gameId: string;
    // public player: Player = new Player();

    // constructor(
    //     private readonly store: Store<GameFeature>
    // ) {
    //     this.players$ = this.store.pipe(select(playersSelector));
    //     this.gameStatus$ = this.store.pipe(select(gameStatusSelector));
    //     this.gameId$ = this.store.pipe(select(gameIdSelector));
    // }

    // ngOnInit(): void {
    //     this.store.dispatch(GameActions.initGame(new GameConfig()));

    //     this.gameId$.subscribe((gameId: string) => {
    //         this.gameId = gameId;
    //     });
    // }

    // public addPlayerClick() {
    //     this.store.dispatch(PlayerActions.joinPlayer(this.gameId, this.player));

    //     this.player = new Player();
    // }
}
