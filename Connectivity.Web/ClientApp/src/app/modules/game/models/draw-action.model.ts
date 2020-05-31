export class DrawAction {
    constructor(
        public fromX?: number,
        public fromY?: number,
        public toX?: number,
        public toY?: number,
        public strokeStyle?: number,
        public lineWidth?: number,
        public erase?: boolean
    ) {
    }
}
