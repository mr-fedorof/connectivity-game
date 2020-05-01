import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-game-chat',
    templateUrl: './game-chat.component.html',
    styleUrls: ['./game-chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameChatComponent {
}
