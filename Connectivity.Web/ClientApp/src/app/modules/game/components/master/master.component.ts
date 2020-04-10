import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameHubService } from '@modules/game/services';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit, OnDestroy {
  constructor(
    private readonly gameHubService: GameHubService,
  ) { }

  ngOnInit(): void {
    this.gameHubService.start();
  }

  ngOnDestroy(): void {
    this.gameHubService.stop();
  }
}
