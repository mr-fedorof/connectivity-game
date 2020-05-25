import { GameCardTaskType } from '../enums';

export class GameCardTask {
    public id: string;
    public type: GameCardTaskType;
    public questions: string[];
    public bannedWords: string[];

    constructor(model: Partial<GameCardTask> = {}) {
        Object.assign(this, model);
    }
}

export function getCardTaskName(type: GameCardTaskType): string {
    switch (type) {
        case GameCardTaskType.JokerNotMyFilm:
            return 'GAME_TASK.NOT_MY_FILM';
        case GameCardTaskType.JokerNotMySong:
            return 'GAME_TASK.NOT_MY_SONG';
        case GameCardTaskType.JokerSpeakingBook:
            return 'GAME_TASK.SPEAKING_BOOK';
        case GameCardTaskType.JokerTopsyTurvy:
            return 'GAME_TASK.TOPSY_TURVY';
        default:
            return '';
    }
}
