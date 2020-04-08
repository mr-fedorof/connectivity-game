import { Player } from './player.model';

export class Team {
    public id: string;
    public name: string;
    public players: Player[];

    constructor(model: Partial<Team> = {}) {
        Object.assign(this, model);
    }
}
