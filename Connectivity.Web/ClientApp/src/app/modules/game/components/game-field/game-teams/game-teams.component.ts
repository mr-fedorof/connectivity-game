import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player, Team } from '@modules/game/models';

@Component({
    selector: 'app-game-teams',
    templateUrl: './game-teams.component.html',
    styleUrls: ['./game-teams.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTeamsComponent {
    @Input() public teams: Team[];
    @Input() public players: Player[];
}
