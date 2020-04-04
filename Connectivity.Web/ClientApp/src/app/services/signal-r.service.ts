import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChatModel } from '../models/chat';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    public data;

    private hubConnection: signalR.HubConnection

    public startConnection = (url) => {
        if (!this.hubConnection) {
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(url)
                .build();
        }

        if (this.hubConnection.state === 0) {
            this.hubConnection
                .start()
                .then(() => console.log('Connection started'))
                .catch(err => console.log('Error while starting connection: ' + err))
        }

        return this.hubConnection;
    }

    public addTransferDataListener = (eventName, callback) => {
        this.hubConnection.on(eventName, callback);
    }


    public transferData = (eventName, ...args) => {
        this.hubConnection.invoke(eventName, ...args).catch(function (err) {
            return console.error(err.toString());
        });
    }
}
