import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChatModel } from '../models/chat';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    public data;
    private subs = [];
    private hubConnection: signalR.HubConnection;

    public isConnected = () => {
        return this.hubConnection && this.hubConnection.state === 1;
    }
    public startConnection = (url) => {
        if (!this.hubConnection) {
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(url)
                .build();
        }

        if (this.hubConnection.state === 0) {
            return this.hubConnection
                .start()
                .then((res) => console.log('Connection started', res))
                .catch(err => console.log('Error while starting connection: ' + err));
        }
    }

    public closeConnection = () => {
        if (this.hubConnection && this.hubConnection.state === 1) {
          this.subs.forEach((sub) => {
              this.hubConnection.off(sub);
          });
            this.hubConnection.stop();

        }
    }

    public addTransferDataListener = (eventName, callback) => {
        this.hubConnection.on(eventName, callback);
        this.subs.push(eventName);
    }

    public transferData = (eventName, ...args) => {
        this.hubConnection.invoke(eventName, ...args).catch((err) => {
            return console.error(err.toString());
        });
    }
}
