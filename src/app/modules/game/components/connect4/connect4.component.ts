import { Component } from '@angular/core';
import { GamePlayer } from '@app-enums';

@Component({
  selector: 'app-connect4',
  templateUrl: './connect4.component.html',
  styleUrls: ['./connect4.component.scss']
})
export class Connect4Component {

  //#region Class properties

  currentPlayer: GamePlayer;

  //#endregion

  constructor() {
    this.currentPlayer = GamePlayer.RED;
  }

}
