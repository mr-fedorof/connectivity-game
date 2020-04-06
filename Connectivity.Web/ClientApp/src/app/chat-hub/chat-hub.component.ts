import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from "@aspnet/signalr";

import { SignalRService } from '../services/signal-r.service';

@Component({
    selector: 'app-chat-hub-data',
    templateUrl: './chat-hub.component.html'
})
export class ChatHubComponent {
    public hithanks;
    public hub;
    public apiUrl: string;

    constructor(public signalRService: SignalRService, private http: HttpClient, @Inject('API_URL') apiUrl: string) {
        this.apiUrl = apiUrl;
        this.http.get(apiUrl + 'HiThanks', { responseType: 'text' }).subscribe(result => {
            this.hithanks = result;
        }, error => console.error(error));
    }

    ngOnInit() {
        this.hub = this.signalRService.startConnection(this.apiUrl + "MultiHub");
        this.signalRService.addTransferDataListener('ReceiveMessage', (response) => {
            var msg = response.message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var encodedMsg = response.user + " says " + msg;
            var li = document.createElement("li");
            li.textContent = encodedMsg;
            document.getElementById("messagesList").appendChild(li);
        });

        document.getElementById("sendButton").addEventListener("click", (event) => {
            var user = (<HTMLInputElement>document.getElementById("userInput")).value;
            var message = (<HTMLInputElement>document.getElementById("messageInput")).value;

            this.signalRService.transferData("BroadcastChatMessage", user, message)
            event.preventDefault();
        });
    }
}

