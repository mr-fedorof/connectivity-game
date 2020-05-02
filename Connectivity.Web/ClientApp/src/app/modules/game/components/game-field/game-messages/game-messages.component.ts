import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-game-messages',
    templateUrl: './game-messages.component.html',
    styleUrls: ['./game-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameMessagesComponent {
}
