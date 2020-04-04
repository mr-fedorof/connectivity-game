import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from "@aspnet/signalr";

import { SignalRService } from '../services/signal-r.service';

@Component({
    selector: 'app-canvas-hub',
    templateUrl: './canvas-hub.component.html',
    styleUrls: ['./canvas-hub.component.css']
})
export class CanvasHubComponent {
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
    }

    ngOnInit() {

        this.hub = this.signalRService.startConnection(this.apiUrl + "canvasHub");
        this.signalRService.addTransferDataListener('Drawing', (res, clientX, clientY) => {
            this.findxy(res, { clientX, clientY });
        });

        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d')

        this.w = this.canvas.width;
        this.h = this.canvas.height;

        this.canvas.addEventListener("mousemove", (e) => {
            let res = 'move';
            this.handleUserDraw(res, e)
        }, false);
        this.canvas.addEventListener("mousedown", (e) =>  {
            this.handleUserDraw('down', e)
        }, false);
        this.canvas.addEventListener("mouseup", (e) =>  {
            this.handleUserDraw('up', e)
        }, false);
        this.canvas.addEventListener("mouseout", (e) =>  {
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

    erase() {
        this.canvasContext.clearRect(0, 0, this.w, this.h);
    }

    handleUserDraw(res, e) {
        this.signalRService.transferData("SendMessage", res, e.clientX, e.clientY);
        this.findxy(res, e);
    }

    findxy(res, e) {
        if (res == 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;

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
        if (res == 'up' || res == "out") {
            this.flag = false;
        }
        if (res == 'move') {
            if (this.flag) {
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - this.canvas.offsetLeft;
                this.currY = e.clientY - this.canvas.offsetTop;
                this.draw();
            }
        }
    }
}

