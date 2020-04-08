export class Player {
    public id: string;
    public name: string;
    public teamId: string;

    constructor(model: Partial<Player> = {}) {
        Object.assign(this, model);
    }
}
