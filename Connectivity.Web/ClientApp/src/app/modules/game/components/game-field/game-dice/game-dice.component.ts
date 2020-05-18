import { AnimationEvent } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { GameDiceService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { takeUntil } from 'rxjs/operators';

import { rollDiceAnimation } from './game-dice.animations';

@Component({
    selector: 'app-game-dice',
    templateUrl: './game-dice.component.html',
    styleUrls: ['./game-dice.component.scss'],
    animations: [
        rollDiceAnimation(),
    ],
})
export class GameDiceComponent extends DestroyableComponent implements OnInit {
    public rollTo = null;
    public rollDiceAnimationState = 'roll-start';

    @Input() public value: number = null;

    constructor(
        private readonly gameDiceService: GameDiceService
    ) {
        super();
    }

    public ngOnInit(): void {
        if (this.value > 0) {
            this.rollDiceAnimationState = `roll-to-${this.value}`;
        }

        this.gameDiceService.rollDice$
            .pipe(
                takeUntil(this.onDestroy)
            )
            .subscribe(value => {
                this.rollTo = value;
                this.rollDiceAnimationState = 'roll-pre-end';
            });
    }

    public onRollDiceAnimationDone(event: AnimationEvent): void {
        switch (event.toState) {
            case 'roll-pre-end':
                this.rollDiceAnimationState = `roll-to-${this.rollTo}`;

                return;

            case 'roll-to-1':
            case 'roll-to-2':
            case 'roll-to-3':
            case 'roll-to-4':
            case 'roll-to-5':
            case 'roll-to-6':
                this.gameDiceService.rollDiceFinish();

                return;

            default:
                return;
        }
    }
}
