import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameMessageService } from '@modules/game/services';
import { LocalizationService } from '@modules/localization';
import { DestroyableComponent } from '@shared/destroyable';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-game-messages',
    templateUrl: './game-messages.component.html',
    styleUrls: ['./game-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameMessagesComponent extends DestroyableComponent implements OnInit {
    public gameMessages: { text: string, createdAt: string }[] = [];

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly gameMessageService: GameMessageService,
        private readonly localizationService: LocalizationService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.gameMessageService.messages$
            .pipe(
                takeUntil(this.onDestroy),
            )
            .subscribe(gameMessage => {
                this.gameMessages.push({
                    text: this.localizationService.translate(gameMessage.messageKey, gameMessage.params),
                    createdAt: gameMessage.createdAt,
                });

                this.cdr.markForCheck();
            });
    }
}
