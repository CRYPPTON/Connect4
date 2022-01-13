import { Component } from '@angular/core';
import { GamePlayer } from '@app-enums';
import { GameEngineService } from 'src/app/core/services';

@Component({
  selector: 'app-connect4',
  templateUrl: './connect4.component.html',
  styleUrls: ['./connect4.component.scss']
})
export class Connect4Component {

  //#region Class properties

  get currentPlayer(): GamePlayer {
    return this.gameEngineServices.currentPlayer;
  };

  get redMoves(): number {
    return this.gameEngineServices.redMoves;
  }

  get yellowMoves(): number {
    return this.gameEngineServices.yellowMoves;
  }

  get player(): typeof GamePlayer {
    return GamePlayer;
  }

  //#endregion

  constructor(private gameEngineServices: GameEngineService) { }

  //#region UI Events

  public onNewGame(): void {
    this.gameEngineServices.initGame();
  }

  //#endregion

}
