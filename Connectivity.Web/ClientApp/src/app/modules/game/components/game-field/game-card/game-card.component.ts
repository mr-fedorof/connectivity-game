import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameCardType } from '@modules/game/enums';
import { GameCard, Player, PlayerTurnState } from '@modules/game/models';
import { GameService } from '@modules/game/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
    // Customizing game card back

    @Input() public type: GameCardType;
    @Input() public simplifiedBack = false;

    // Customizing game card front

    @Input() public frontEnabled = false;
    @Input() public gameCard: GameCard = null;

    @Input() public gameCardTaskContentState = 'undefined';
    @Output() public readonly gameCardTaskContentAnimationDone: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

    public get currentPlayer$(): Observable<Player> {
        return this.gameService.currentPlayer$;
    }

    public get activePlayer$(): Observable<Player> {
        return this.gameService.activePlayer$;
    }

    public get playerTurnState$(): Observable<PlayerTurnState> {
        return this.gameService.playerTurnState$;
    }

    constructor(
        private readonly gameService: GameService
    ) {
    }

    public onGameCardTaskContentAnimationDone(event: AnimationEvent): void {
        this.gameCardTaskContentAnimationDone.emit(event);
    }
}
