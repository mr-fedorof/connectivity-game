import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { GameCardType } from '@modules/game/enums';
import { range } from 'lodash';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
    public diceDots: number[];

    @Input() public type: GameCardType;

    @HostBinding('class') public get hostClass(): string {
        return `app-game-card ${this.getTypeClass(this.type)}`;
    }

    public ngOnInit(): void {
        const diceCount = this.getDiceCount(this.type);

        this.diceDots = range(diceCount);
    }

    private getTypeClass(type: GameCardType): string {
        switch (type) {
            case GameCardType.Talk:
                return 'app-game-card--talk';
            case GameCardType.Mine:
                return 'app-game-card--mine';
            case GameCardType.Draw:
                return 'app-game-card--draw';
            case GameCardType.Crocodile:
                return 'app-game-card--crocodile';
            case GameCardType.Agent:
                return 'app-game-card--agent';
            case GameCardType.Joker:
                return 'app-game-card--joker';
            default:
                return '';
        }
    }

    private getDiceCount(type: GameCardType): number {
        switch (type) {
            case GameCardType.Talk:
                return 1;
            case GameCardType.Mine:
                return 2;
            case GameCardType.Draw:
                return 3;
            case GameCardType.Crocodile:
                return 4;
            case GameCardType.Agent:
                return 5;
            case GameCardType.Joker:
                return 6;
            default:
                return 0;
        }
    }
}
