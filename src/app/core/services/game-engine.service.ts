import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogType, GamePlayer } from 'src/app/shared/enums';
import { DialogService } from '.';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  //#region class properties

  columns: number;
  rows: number;
  currentPlayer: GamePlayer;
  slectedRow: number;
  board: Array<GamePlayer[]>
  winner: GamePlayer;

  //#endregion

  constructor(
    private dialogService: DialogService,
    private translationService: TranslateService
  ) {
    this.initGame();
  }

  //#region Game functionality

  public play(column: number) {

    this.setPlayerOnBoard(column);

    this.checkGameWinner(column);

    this.changePlayer();
  }

  /**
   * Initialization game properties.
   */
  public initGame(): void {
    this.columns = 7;
    this.rows = 6;

    this.currentPlayer = GamePlayer.RED;

    this.createBoard();

  }

  //#endregion

  //#region Game utility

  public setPlayerOnBoard(column: number): void {
    for (let i = this.board.length - 1; i >= 0; i--) {
      if (!this.board[i][column]) {
        this.slectedRow = i;
        this.board[i][column] = this.currentPlayer;
        break;
      }
    }
  }

  /**
   * Change current player.
   */
  private changePlayer() {
    if (this.currentPlayer == GamePlayer.RED) {
      this.currentPlayer = GamePlayer.YELLOW;
    } else {
      this.currentPlayer = GamePlayer.RED;
    }
  }

  /**
   * Create am empty game board.
   */
  private createBoard(): void {
    let board = new Array();
    for (let i = 0; i < this.rows; i++) {
      board.push(new Array(this.columns));
    }
    this.board = board;
  }

  //#endregion

  //#region Check game methods

  private checkGameWinner(column: number): void {
    this.checkVertical(column);
    this.checkHorizontal(column);
  }

  /**
   * Check winner for vertical.
   * @param column selected column.
   */
  private checkVertical = async (column: number): Promise<void> => {
    let count = 0;

    if ((this.rows - this.slectedRow + 1) > 4) {
      for (let i = this.slectedRow; i < this.slectedRow + 4; i++) {
        if (this.board[this.slectedRow][column] == this.board[i][column]) {
          count++;
        }
      }
    }
    if (count == 4) {
      this.winner = this.board[this.slectedRow][column];
      const result = await this.dialogService.showDialog(
        this.translationService.instant("dialogMessage.win"),
        this.winner,
        DialogType.success)

      if (result) {
        this.initGame();
      }

    }

  }

  private checkHorizontal(column: number): void {
    //...
  }

  //#endregion

}
