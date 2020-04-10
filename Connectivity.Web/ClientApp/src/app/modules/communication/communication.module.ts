import { NgModule } from '@angular/core';
import { SignalRService } from './services';

@NgModule({
    providers: [
        SignalRService,
    ],
})
export class CommunicationModule {
}
