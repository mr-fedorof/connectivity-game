import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { GameHubService, GameService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { fromEvent, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { DrawAction } from '../../../models';

@Component({
    selector: 'app-game-risovach',
    templateUrl: './game-risovach.component.html',
    styleUrls: ['./game-risovach.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRisovachComponent extends DestroyableComponent implements OnInit, AfterViewInit {
    private readonly _drawActionsSubject = new Subject<DrawAction>();

    private lobbyId: string = null;
    private isDrawing = false;

    public readonly canvasWidth = 640;
    public readonly canvasheight = 360;

    public readonly lineWeights = [
        8,
        12,
        16,
        24,
        32,
    ];

    public readonly colors = [
        '#000000',
        '#FF0000',
        '#FF7F00',
        '#FFFF00',
        '#00FF00',
        '#0000FF',
        '#4B0082',
        '#8F00FF',
    ];

    public readonly drawActions$: Observable<DrawAction> = this._drawActionsSubject.asObservable();

    @ViewChild('canvas')
    public canvasEl: ElementRef<HTMLCanvasElement>;

    public canvas: HTMLCanvasElement;
    public canvasContext: CanvasRenderingContext2D;

    public currentLineWeight: number = this.lineWeights[0];
    public currentColorIndex: number = 0;
    public get currentColor(): string {
        return this.colors[this.currentColorIndex];
    }
    public currentX: number;
    public currentY: number;

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly gameHubService: GameHubService,
        private readonly gameService: GameService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.gameService.lobby$
            .pipe(
                takeUntil(this.onDestroy),
                take(1)
            )
            .subscribe(lobby => {
                this.lobbyId = lobby.id;
                this.initDrawActionsSync(lobby.id);
            });
    }

    public ngAfterViewInit(): void {
        this.canvas = this.canvasEl.nativeElement;
        this.canvasContext = this.canvasEl.nativeElement.getContext('2d');

        this.initCanvas();
    }

    public onLineWeightClick(lineWeight): void {
        this.currentLineWeight = lineWeight;
    }

    public onPenColorClick(colorIndex: number): void {
        this.currentColorIndex = colorIndex;
    }

    public onClearClick(): void {
        this.eraseCanvas();

        this.gameHubService.sendDrawAction(this.lobbyId, { erase: true });
    }

    public initDrawActionsSync(lobbyId: string): void {
        this.gameHubService.restoreDrawActions(lobbyId)
            .subscribe((drawActions: DrawAction[]) => {
                drawActions.forEach(drawPayload => {
                    this._drawActionsSubject.next(drawPayload);
                });
            });

        this.gameHubService.listenToDrawActions()
            .subscribe((drawPayload: DrawAction) => {
                this._drawActionsSubject.next(drawPayload);
            });

        this.drawActions$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(p => {
                this.drawCanvas(p);
                this.cdr.markForCheck();
            });
    }

    public initCanvas(): void {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasheight;

        this.canvasContext.lineCap = 'round';
        this.canvasContext.lineJoin = 'round';
        this.canvasContext.strokeStyle = this.currentColor;
        this.canvasContext.lineWidth = this.currentLineWeight;

        fromEvent(this.canvas, 'mousedown')
            .pipe(takeUntil(this.onDestroy))
            .subscribe((e: MouseEvent) => {
                this.onCanvasMousedown(e);
            });

        fromEvent(this.canvas, 'mousemove')
            .pipe(takeUntil(this.onDestroy))
            .subscribe((e: MouseEvent) => {
                this.onCanvaseMousemove(e);
            });

        fromEvent(this.canvas, 'touchstart')
            .pipe(takeUntil(this.onDestroy))
            .subscribe((e: TouchEvent) => {
                this.onCanvasTouchstart(e);
            });

        fromEvent(this.canvas, 'touchmove')
            .pipe(takeUntil(this.onDestroy))
            .subscribe((e: TouchEvent) => {
                this.onCanvasTouchMove(e);
            });

        fromEvent(document, 'mouseup')
            .pipe(takeUntil(this.onDestroy))
            .subscribe((e: MouseEvent) => {
                this.onDocumentMouseup(e);
            });
    }

    public onCanvasMousedown(e: MouseEvent): void {
        this.isDrawing = true;

        const canvasPos = this.getCanvasPosition(this.canvas, e);

        const drawAction = new DrawAction(
            canvasPos.x,
            canvasPos.y,
            canvasPos.x,
            canvasPos.y,
            this.currentColorIndex,
            this.currentLineWeight);

        this.drawCanvas(drawAction);

        this.gameHubService.sendDrawAction(this.lobbyId, drawAction);
    }

    public onCanvaseMousemove(e: MouseEvent): void {
        if (!this.isDrawing) {
            return;
        }

        const canvasPos = this.getCanvasPosition(this.canvas, e);

        const drawAction = new DrawAction(
            this.currentX,
            this.currentY,
            canvasPos.x,
            canvasPos.y,
            this.currentColorIndex,
            this.currentLineWeight);

        this.drawCanvas(drawAction);

        this.gameHubService.sendDrawAction(this.lobbyId, drawAction);
    }

    public onCanvasTouchstart(e: TouchEvent): void {
        e.preventDefault();

        const touch = e.changedTouches[0];
        const canvasPos = this.getCanvasPosition(this.canvas, touch);

        const drawAction = new DrawAction(
            canvasPos.x,
            canvasPos.y,
            canvasPos.x,
            canvasPos.y,
            this.currentColorIndex,
            this.currentLineWeight);

        this.drawCanvas(drawAction);

        this.gameHubService.sendDrawAction(this.lobbyId, drawAction);
    }

    public onCanvasTouchMove(e: TouchEvent): void {
        e.preventDefault();

        const touch = e.changedTouches[0];
        const canvasPos = this.getCanvasPosition(this.canvas, touch);

        const drawAction = new DrawAction(
            this.currentX,
            this.currentY,
            canvasPos.x,
            canvasPos.y,
            this.currentColorIndex,
            this.currentLineWeight);

        this.drawCanvas(drawAction);

        this.gameHubService.sendDrawAction(this.lobbyId, drawAction);
    }

    public onDocumentMouseup(e: MouseEvent): void {
        this.isDrawing = false;
    }

    private drawCanvas(drawAction: DrawAction): void {
        if (drawAction.erase) {
            this.eraseCanvas();

            return;
        }

        this.canvasContext.beginPath();
        this.canvasContext.moveTo(drawAction.fromX, drawAction.fromY);
        this.canvasContext.lineTo(drawAction.toX, drawAction.toY);
        this.canvasContext.lineWidth = drawAction.lineWidth;
        this.canvasContext.strokeStyle = this.colors[drawAction.strokeStyle];
        this.canvasContext.stroke();

        this.currentX = drawAction.toX;
        this.currentY = drawAction.toY;
    }

    private eraseCanvas(): void {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private getCanvasPosition(canvas: HTMLCanvasElement, e: MouseEvent | Touch): { x: number, y: number } {
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: Math.round((e.clientX - rect.left) * scaleX),
            y: Math.round((e.clientY - rect.top) * scaleY),
        };
    }
}
