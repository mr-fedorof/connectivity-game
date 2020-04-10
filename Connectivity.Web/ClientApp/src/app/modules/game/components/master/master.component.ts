import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameHubService } from '@modules/game/services';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit, OnDestroy {
  constructor(
    private readonly gameHubService: GameHubService
  ) { }

  public ngOnDestroy(): void {
    this.gameHubService.stop();
  }

  public ngOnInit(): void {
    this.gameHubService.start();
  }
}
