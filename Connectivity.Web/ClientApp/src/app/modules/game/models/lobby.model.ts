import { Game } from './game.model';
import { Player } from './player.model';
import { Team } from './team.model';

export interface ILobby {
    id: string;
    name: string;
    teams: Team[];
    game: Game;
    players: Player[];
}

export class Lobby implements ILobby {
    public id: string;
    public name: string;
    public teams: Team[];
    public game: Game;
    public players: Player[];

    constructor(model: Partial<Lobby> = {}) {
        Object.assign(this, model);
    }
}

export const initialLobby: ILobby = {
    id: null,
    name: null,
    teams: [],
    game: null,
    players: []
};
