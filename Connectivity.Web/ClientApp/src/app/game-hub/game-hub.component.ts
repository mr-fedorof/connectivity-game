import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignalRService } from '../services/signal-r.service';

@Component({
    selector: 'app-game-hub',
    templateUrl: './game-hub.component.html',
    styleUrls: ['./game-hub.component.css']
})
export class GameHubComponent {
    public hithanks;
    public roomId;
    public userName;

    //TODO: refactor this shit
    public canvas;
    public canvasContext;
    public prevX = 0;
    public prevY = 0;
    public currX = 0;
    public currY = 0;
    public x = 'black';
    public y = 2;
    public w;
    public h;
    public flag = false;
    public dot_flag = false;

    public hub;
    public apiUrl: string;

    constructor(public signalRService: SignalRService, private http: HttpClient, @Inject('API_URL') apiUrl: string) {
        this.apiUrl = apiUrl;
        this.http.get(apiUrl + 'HiThanks', { responseType: 'text' }).subscribe(result => {
            this.hithanks = result;
        }, error => console.error(error));
    }

    ngOnInit() {
        
    }

    joinRoom() {
        this.signalRService.startConnection(this.apiUrl + "MultiHub").then(() => {
          //TODO: rewrite to model binding
          this.roomId = (<HTMLInputElement>document.getElementById("roomId")).value;
          this.userName = (<HTMLInputElement>document.getElementById("userName")).value;
          this.signalRService.transferData("JoinRoom", this.roomId, this.userName);

          //TODO: make a handshake to make sure that user joined to the room
          this.initGameRoom();
        });
    }

    leaveRoom() {
        //TODO: make cleanup, remove this stub:
        document.getElementById("messagesList").innerHTML = '';
        this.canvasContext.clearRect(0, 0, this.w, this.h);
        this.signalRService.transferData("LeaveRoom", this.roomId, this.userName);
        this.signalRService.closeConnection();
        this.roomId = null;
    }

    initGameRoom() {
        //TODO: cleanup subscriptions
        this.signalRService.addTransferDataListener('ReceiveServiceMessage', (response) => {
            var li = document.createElement("li");
            li.textContent = response;
            document.getElementById("messagesList").appendChild(li);
        });

        this.signalRService.addTransferDataListener('ReceiveMessage', (response) => {
            var msg = response.message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var encodedMsg = response.userName + " says " + msg;
            var li = document.createElement("li");
            li.textContent = encodedMsg;
            document.getElementById("messagesList").appendChild(li);
        });

        this.signalRService.addTransferDataListener('ClearCanvas', () => {
            this.canvasContext.clearRect(0, 0, this.w, this.h);
        });

        this.signalRService.addTransferDataListener('Draw', (response) => {

            var clientX = response.x + this.canvas.offsetLeft + window.scrollX;
            var clientY = response.y + this.canvas.offsetTop + window.scrollY;
            this.prepareDraw(response.eventName, { clientX, clientY });
        });

        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d')

        this.w = this.canvas.width;
        this.h = this.canvas.height;

        this.canvas.addEventListener("mousemove", (e) => {
            let res = 'move';
            this.handleUserDraw(res, e)
        }, false);
        this.canvas.addEventListener("mousedown", (e) => {
            this.handleUserDraw('down', e)
        }, false);
        this.canvas.addEventListener("mouseup", (e) => {
            this.handleUserDraw('up', e)
        }, false);
        this.canvas.addEventListener("mouseout", (e) => {
            this.handleUserDraw('out', e)
        }, false);
    }

    draw() {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.prevX, this.prevY);
        this.canvasContext.lineTo(this.currX, this.currY);
        this.canvasContext.strokeStyle = this.x;
        this.canvasContext.lineWidth = this.y;
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    }

    erase(e) {
        this.signalRService.transferData("BroadcastClearCanvas", this.roomId);
        this.canvasContext.clearRect(0, 0, this.w, this.h);
    }

    handleUserDraw(eventName, e) {
        var x = e.clientX - this.canvas.offsetLeft + Math.round(window.scrollX);
        var y = e.clientY - this.canvas.offsetTop + Math.round(window.scrollY);
        this.signalRService.transferData("BroadcastDrawing", this.roomId, eventName, x, y);
        this.prepareDraw(eventName, e);
    }

    prepareDraw(eventName, e) {
        if (eventName == 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - this.canvas.offsetLeft + Math.round(window.scrollX);
            this.currY = e.clientY - this.canvas.offsetTop + Math.round(window.scrollY);

            this.flag = true;
            this.dot_flag = true;
            if (this.dot_flag) {
                this.canvasContext.beginPath();
                this.canvasContext.fillStyle = this.x;
                this.canvasContext.fillRect(this.currX, this.currY, 2, 2);
                this.canvasContext.closePath();
                this.dot_flag = false;
            }
        }
        if (eventName == 'up' || eventName == "out") {
            this.flag = false;
        }
        if (eventName == 'move') {
            if (this.flag) {
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - this.canvas.offsetLeft + Math.round(window.scrollX);
                this.currY = e.clientY - this.canvas.offsetTop + Math.round(window.scrollY);
                this.draw();
            }
        }
    }

    sendMessage(e) {
        let message = (<HTMLInputElement>document.getElementById("messageInput")).value;
        this.signalRService.transferData("BroadcastChatMessage", this.roomId, this.userName, message);
        (<HTMLInputElement>document.getElementById("messageInput")).value = '';
    }
}

