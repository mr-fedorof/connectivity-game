import { Pipe, PipeTransform } from '@angular/core';

import { Player } from '../models';

@Pipe({
    name: 'teamPlayers'
})
export class TeamPlayersPipe implements PipeTransform {
    public transform(players: Player[], teamId: string): Player[] {
        return players?.filter(p => p.teamId === teamId);
    }
}
