import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player, Team } from '@modules/game/models';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsComponent {
    @Input() public teams: Team[];
    @Input() public players: Player[];
}
