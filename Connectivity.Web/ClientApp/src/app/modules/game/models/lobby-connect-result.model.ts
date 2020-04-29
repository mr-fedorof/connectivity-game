import { Lobby } from './lobby.model';

export class LobbyConnectResult {
    public globalActionIndex: number;
    public lobby: Lobby;

    constructor(model: Partial<LobbyConnectResult> = {}) {
        Object.assign(this, model);
    }
}
