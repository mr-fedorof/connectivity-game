import { uniq } from 'lodash';

import { GameStatus } from '../enums';
import { Game } from './game.model';
import { Player } from './player.model';
import { Team } from './team.model';

export interface ILobby {
    id: string;
    name: string;
    teams: Team[];
    game: Game;
    players: Player[];
    lastActionIndex: number;
}

export class Lobby implements ILobby {
    public id: string;
    public name: string;
    public teams: Team[];
    public game: Game;
    public players: Player[];
    public lastActionIndex: number;

    constructor(model: Partial<Lobby> = {}) {
        Object.assign(this, model);
    }
}

export const initialLobby: ILobby = {
    id: null,
    name: null,
    teams: [],
    game: {
        status: GameStatus.WaitingForPlayers,
        playerTurnId: null,
        playerTurnState: {},
    },
    players: [],
    lastActionIndex: null,
};

export function isReadyToStartGame(lobby: Lobby): boolean {
    const isAllPlayersJoinedTeams: boolean = lobby.players.every(p => !!p.teamId);
    const isAllPlayersReady: boolean = lobby.players.every(p => !!p.ready);
    const isAtLeastTwoTeams: boolean = uniq(lobby.players.map(p => p.teamId)).length >= 2;

    return lobby.game.status === GameStatus.WaitingForPlayers
        && isAllPlayersJoinedTeams
        && isAllPlayersReady
        && isAtLeastTwoTeams;
}
