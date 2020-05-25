import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameCardType } from '@modules/game/enums';
import { GameCard } from '@modules/game/models';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
    @Input() public type: GameCardType;

    // Customizing game card back
    @Input() public simplifiedBack = false;

    // Customizing game card front
    @Input() public frontEnabled = false;
    @Input() public isCardMaster = null;
    @Input() public gameCard: GameCard = null;
    @Input() public gameCardContentState = 'undefined';
    @Output() public readonly gameCardContentAnimationDone: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

    public onGameCardContentAnimationDone(event: AnimationEvent): void {
        this.gameCardContentAnimationDone.emit(event);
    }
}
