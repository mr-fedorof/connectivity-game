export interface IGameSession {
    lobbyId: string;
    playerId: string;
}

export class GameSession implements IGameSession {
    public lobbyId: string;
    public playerId: string;

    constructor(model: Partial<GameSession> = {}) {
        Object.assign(this, model);
    }
}

export const initialGameSession: IGameSession = {
    lobbyId: null,
    playerId: null
};
