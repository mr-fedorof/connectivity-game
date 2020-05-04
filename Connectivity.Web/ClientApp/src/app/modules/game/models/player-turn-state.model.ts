export class PlayerTurnState {
    public diceValue?: number;

    constructor(model: Partial<PlayerTurnState> = {}) {
        Object.assign(this, model);
    }
}
