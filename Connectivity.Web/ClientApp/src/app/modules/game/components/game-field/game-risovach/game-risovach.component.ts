import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { GameRisovachService } from '@modules/game/services/game-risovach.service';
import { DestroyableComponent } from '@shared/destroyable';
import { takeUntil, tap } from 'rxjs/operators';
import { DrawPayload } from '../../../models';

@Component({
    selector: 'app-game-risovach',
    templateUrl: './game-risovach.component.html',
    styleUrls: ['./game-risovach.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRisovachComponent extends DestroyableComponent implements OnInit {
    public canvas;

    public canvasContext;
    public colors = ["#000", "#f00", "#ff7f00", "#ff0", "#0f0", "#00f", "#4b0082", "#8f00ff", "#fff"];
    public lineWeights = [1, 3, 5, 7, 10, 15, 25];
    public lineWeight = 1;
    public strokeCode = 0;
    public oX;
    public oY;
    private isDrawing = false;

    constructor(
        private readonly risovachService: GameRisovachService,
        private cdr: ChangeDetectorRef,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d');
        this.canvasContext.lineCap = "round";
        this.canvasContext.lineJoin = "round";
        this.canvasContext.strokeStyle = "#000";
        this.canvasContext.lineWidth = 1;

        this.canvasEvents();
    }

    ngAfterViewInit() {
        this.risovachService.drawings$
            .pipe(
                takeUntil(this.onDestroy),
            )
            .subscribe(p => {
                this.drawMove(p);
                this.cdr.markForCheck();
            });
    }


    public onLineWeightClick(lineWeight) {
        this.lineWeight = lineWeight;
    }

    public onStrokeColorClick(code) {
        this.strokeCode = code;
    }

    public onClearClick() {
        this.eraseCanvas();
        this.risovachService.drawMove({ erase: true });
    }

    public eraseCanvas() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Consume functions, client and server
    public drawMove(p) {
        if (p.erase === true) {
            this.eraseCanvas();
            return;
        }

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(p.fromX, p.fromY);
        this.canvasContext.lineTo(p.toX, p.toY);
        this.canvasContext.lineWidth = p.lineWidth;
        this.canvasContext.strokeStyle = this.colors[p.strokeStyle];
        this.canvasContext.stroke();
    }

    // Common mousedown
    public start(e) {
        this.isDrawing = true;
        this.oX = e.offsetX;
        this.oY = e.offsetY;

        let p = new DrawPayload(
            this.oX,
            this.oY,
            this.oX - 1,
            this.oY - 1,
            this.strokeCode,
            this.lineWeight);

        console.log(`draw out`, p)
        this.drawMove(p);
        this.risovachService.drawMove(p);
    };

    public touchStart(e) {
        var touchEvent = e.originalEvent.changedTouches[0];
        e.preventDefault();
        this.oX = touchEvent.clientX - touchEvent.target.offsetLeft;
        this.oY = touchEvent.clientY - touchEvent.target.offsetTop;

        let p = new DrawPayload(
            this.oX,
            this.oY,
            this.oX - 1,
            this.oY - 1,
            this.strokeCode,
            this.lineWeight);

        this.drawMove(p);
        this.risovachService.drawMove(p);
    };

    // Mouse only control
    public stop(e) {
        this.isDrawing = false;
    };

    // Common mousemove
    public move(e) {
        if (this.isDrawing) {
            let x = e.offsetX;
            let y = e.offsetY;

            let p = new DrawPayload(
                this.oX,
                this.oY,
                x,
                y,
                this.strokeCode,
                this.lineWeight);

            this.drawMove(p);
            this.risovachService.drawMove(p);
            this.oX = x;
            this.oY = y;
        }
    };

    public touchMove(e) {
        var touchEvent = e.originalEvent.changedTouches[0];
        e.preventDefault();
        let x = touchEvent.clientX - touchEvent.target.offsetLeft;
        let y = touchEvent.clientY - touchEvent.target.offsetTop;

        let p = new DrawPayload(
            this.oX,
            this.oY,
            x,
            y,
            this.strokeCode,
            this.lineWeight);

        this.drawMove(p);
        this.risovachService.drawMove(p);
        this.oX = x;
        this.oY = y;
    };

    // Canvas Events & EventListeners
    public canvasEvents() {
        this.canvas.addEventListener("mousedown", this.start.bind(this), false);
        this.canvas.addEventListener("mousemove", this.move.bind(this), false);
        this.canvas.addEventListener("touchstart", this.touchStart.bind(this), false);
        this.canvas.addEventListener("touchmove", this.touchMove.bind(this), false);
        document.addEventListener("mouseup", this.stop.bind(this), false);
    }
}
