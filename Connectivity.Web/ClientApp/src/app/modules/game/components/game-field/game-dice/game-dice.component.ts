import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameDiceService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { takeUntil } from 'rxjs/operators';

import { rollDiceAnimation } from './game-dice.animations';

@Component({
    selector: 'app-game-dice',
    templateUrl: './game-dice.component.html',
    styleUrls: ['./game-dice.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        rollDiceAnimation(),
    ],
})
export class GameDiceComponent extends DestroyableComponent implements OnInit {
    public rollTo = null;
    public rollDiceAnimationState = 'undefined';

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly gameDiceService: GameDiceService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.gameDiceService.rollDice$
            .pipe(
                takeUntil(this.onDestroy)
            )
            .subscribe(value => {
                this.rollTo = value;
                this.setDiceRolledState();
                this.cdr.markForCheck();
            });

        this.gameDiceService.diceValueRestoring$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(diceValue => {
                this.resetRollDiceState();
                this.cdr.markForCheck();

                setTimeout(() => {
                    this.setDiceState(diceValue);
                    this.cdr.markForCheck();
                });
            });
    }

    public onRollDiceAnimationDone(event: AnimationEvent): void {
        if (event.toState === 'dice-rolled') {
            this.setDiceState(this.rollTo);

            return;
        }

        if (event.toState.startsWith('dice-value-') && event.fromState === 'dice-rolled') {
            this.gameDiceService.rollDiceFinish();

            return;
        }
    }

    private setDiceRolledState(): void {
        this.rollDiceAnimationState = 'dice-rolled';
    }

    private setDiceState(value: number): void {
        this.rollDiceAnimationState = `dice-value-${value || 1}`;
    }

    private resetRollDiceState(): void {
        this.rollDiceAnimationState = 'undefined';
    }
}
