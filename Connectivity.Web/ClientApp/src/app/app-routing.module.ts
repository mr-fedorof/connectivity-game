import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { ChatHubComponent } from './chat-hub/chat-hub.component';
import { CanvasHubComponent } from './canvas-hub/canvas-hub.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'chat-hub', component: ChatHubComponent },
  { path: 'canvas-hub', component: CanvasHubComponent },
  {
    path: 'game',
    loadChildren: () => import('@modules/game/game.module').then(m => m.GameModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
