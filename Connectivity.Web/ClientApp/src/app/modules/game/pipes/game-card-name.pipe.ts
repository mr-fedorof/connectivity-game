import { Pipe, PipeTransform } from '@angular/core';

import { GameCardType } from '../enums';
import { getCardName } from '../models';

@Pipe({
    name: 'gameCardName',
})
export class GameCardNamePipe implements PipeTransform {
    public transform(type: GameCardType): string {
        return getCardName(type);
    }
}
