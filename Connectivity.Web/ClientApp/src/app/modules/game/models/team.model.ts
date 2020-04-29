export class Team {
    public id: string;
    public name: string;

    constructor(model: Partial<Team> = {}) {
        Object.assign(this, model);
    }
}
