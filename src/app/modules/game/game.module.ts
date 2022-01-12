import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { Connect4Component } from './components/connect4/connect4.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    Connect4Component,
    GameBoardComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class GameModule { }
