import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { GameCardType } from '@modules/game/enums';
import { gameCardTypeToDice } from '@modules/game/helpers';
import { range } from 'lodash';

@Component({
    selector: 'app-game-card-back',
    templateUrl: './game-card-back.component.html',
    styleUrls: ['./game-card-back.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardBackComponent implements OnInit {
    public diceDots: number[] = [];

    @Input() public type: GameCardType;
    @Input() public simplifiedView: boolean = false;

    @HostBinding('class') public get hostClass(): string {
        return `app-game-card-back ${this.getTypeClass(this.type)} ${this.simplifiedView ? 'app-game-card-back--simplified' : ''}`;
    }

    public ngOnInit(): void {
        if (!this.simplifiedView) {
            this.diceDots = range(gameCardTypeToDice(this.type));
        }
    }

    private getTypeClass(type: GameCardType): string {
        switch (type) {
            case GameCardType.Talk:
                return 'app-game-card-back--talk';
            case GameCardType.Mine:
                return 'app-game-card-back--mine';
            case GameCardType.Draw:
                return 'app-game-card-back--draw';
            case GameCardType.Crocodile:
                return 'app-game-card-back--crocodile';
            case GameCardType.WhoAmI:
                return 'app-game-card-back--agent';
            case GameCardType.Joker:
                return 'app-game-card-back--joker';
            default:
                return '';
        }
    }
}
