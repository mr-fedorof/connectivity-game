import { Component, HostBinding, Input } from '@angular/core';
import { Player, Team } from '@modules/game/models';

@Component({
    selector: 'app-team-info',
    templateUrl: './team-info.component.html',
    styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent {
    @Input() public team: Team;
    @Input() public index: number;
    @Input() public players: Player[];

    @HostBinding('class') public get hostClass(): string {
        return `app-team-info--type-${this.index}`;
    }
}
