import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameCardType } from '@modules/game/enums';
import { Player, Team } from '@modules/game/models';
import { playersSelector, teamsSelector } from '@modules/game/selectors/lobby.selectors';
import { Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent extends DestroyableComponent implements OnInit {
    public readonly GameCardType = GameCardType;

    public teams$: Observable<Team[]>;
    public players$: Observable<Player[]>;

    constructor(
        private readonly store: Store
    ) {
        super();
    }

    public ngOnInit(): void {
        this.teams$ = this.store.select(teamsSelector);
        this.players$ = this.store.select(playersSelector);
    }
}
