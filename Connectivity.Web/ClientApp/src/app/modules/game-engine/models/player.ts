export class Player {
    public id: string;
    public name: string;

    constructor(model: Partial<Player> = {}) {
        Object.assign(this, model);
    }
}
