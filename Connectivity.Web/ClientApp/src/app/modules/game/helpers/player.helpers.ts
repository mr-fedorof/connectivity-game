import { Player } from '../models';

export function playerComparator(p1: Player, p2: Player): boolean {
    if (p1 === p2) {
        return true;
    }

    if (p1.id && p2.id && p1.id === p2.id) {
        return true;
    }

    return false;
}
