import { Pipe, PipeTransform } from '@angular/core';

import { GameCardTaskType } from '../enums';
import { getCardTaskName } from '../models';

@Pipe({
    name: 'gameCardTaskName',
})
export class GameCardTaskNamePipe implements PipeTransform {
    public transform(type: GameCardTaskType): string {
        return getCardTaskName(type);
    }
}
