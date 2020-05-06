import { AnimationEvent } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { DiceService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { takeUntil } from 'rxjs/operators';

import { rollDiceAnimation } from './dice.animations';

@Component({
    selector: 'app-dice',
    templateUrl: './dice.component.html',
    styleUrls: ['./dice.component.scss'],
    animations: [
        rollDiceAnimation()
    ]
})
export class DiceComponent extends DestroyableComponent implements OnInit {
    public rollTo = null;
    public rollDiceAnimationState = 'roll-start';

    @Input() public value: number = null;

    constructor(
        private readonly diceService: DiceService
    ) {
        super();
    }

    public ngOnInit(): void {
        if (this.value > 0) {
            this.rollDiceAnimationState = `roll-to-${this.value}`;
        }

        this.diceService.rollDice$
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
                this.diceService.rollDiceFinish();

                return;

            default:
                return;
        }
    }
}
