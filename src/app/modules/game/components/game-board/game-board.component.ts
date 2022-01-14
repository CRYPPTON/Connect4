import { Component, OnInit } from '@angular/core';
import { GameEngineService } from '@app-services';
import { GamePlayer } from '@app-enums';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  //#region Class properties

  movesRed: number;
  movesYellow: number;

  get board(): Array<GamePlayer[]> {
    return this.gameEngineService.board;
  }

  get columns(): number {
    return this.gameEngineService.columns;
  };

  get rows(): number {
    return this.gameEngineService.rows;
  };

  get gameOver(): boolean {
    return this.gameEngineService.gameOver;
  }

  //#endregion

  constructor(private gameEngineService: GameEngineService) { }

  //#region Life Cycle hooks

  ngOnInit(): void {
    this.movesRed = 0;
    this.movesYellow = 0;

    this.setBorderSize();
  }

  //#endregion

  /**
  * Set game board size.
  */
  private setBorderSize(): void {
    const element = (document.querySelector('.game-board') as HTMLElement);
    element.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`
  }

  //#region

  public onPlay(column: number): void {
    this.gameEngineService.play(column);
  }

  //#endregion

}
