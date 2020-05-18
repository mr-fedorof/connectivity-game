import { Pipe, PipeTransform } from '@angular/core';

import { Player } from '../models';

@Pipe({
    name: 'freePlayers',
})
export class FreePlayersPipe implements PipeTransform {
    public transform(players: Player[]): Player[] {
        return players?.filter(p => !p.teamId);
    }
}
