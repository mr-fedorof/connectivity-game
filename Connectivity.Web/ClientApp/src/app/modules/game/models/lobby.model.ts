import { Team } from './team.model';
import { Game } from './game.model';

export interface ILobby {
    id: string;
    name: string;
    teams: Team[];
    game: Game;
}

export class Lobby implements ILobby {
    public id: string;
    public name: string;
    public teams: Team[];
    public game: Game;

    constructor(model: Partial<Lobby> = {}) {
        Object.assign(this, model);
    }
}

export const initialLobby: ILobby = {
    id: null,
    name: null,
    teams: [],
    game: null
};
