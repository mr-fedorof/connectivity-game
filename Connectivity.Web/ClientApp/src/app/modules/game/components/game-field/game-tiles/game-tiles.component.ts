import { ChangeDetectionStrategy, Component } from '@angular/core';
import { range } from 'lodash';

@Component({
    selector: 'app-game-tiles',
    templateUrl: './game-tiles.component.html',
    styleUrls: ['./game-tiles.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTilesComponent {
    public tiles: number[] = range(50);
}
