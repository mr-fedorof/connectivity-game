export class GameMessage {
    constructor(
        public messageKey: string,
        public params: object,
        public createdAt: string
    ) {
    }
}
