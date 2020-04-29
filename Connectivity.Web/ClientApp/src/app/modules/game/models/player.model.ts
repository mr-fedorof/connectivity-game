export class Player {
    public id: string;
    public name: string;
    public teamId: string;
    public ready: boolean;

    constructor(model: Partial<Player> = {}) {
        Object.assign(this, model);
    }
}
