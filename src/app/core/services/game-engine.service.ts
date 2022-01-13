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
  board: Array<GamePlayer[]>;
  winner: GamePlayer | undefined;
  gameOver: boolean;
  redMoves: number;
  yellowMoves: number;

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
    this.redMoves = 0;
    this.yellowMoves = 0;
    this.gameOver = false;
    this.winner = undefined;
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

  /**
   * Show win dialog.
   */
  public showWinner = async (): Promise<void> => {
    const result = await this.dialogService.showDialog(
      this.translationService.instant("dialogMessage.win"),
      this.winner,
      DialogType.success);

    if (result) {
      this.initGame();
    } else {
      this.gameOver = true;
    }
  }

  //#endregion

  //#region Check game result

  private checkGameWinner(column: number): void {
    this.checkSecondaryDiagonal(column);
    this.checkDiagonal(column);
    this.checkVertical(column);
    this.checkHorizontal(column);

    this.checkDraw();

    if (this.winner) {
      this.showWinner();
    }

    if (this.currentPlayer == GamePlayer.RED) {
      this.redMoves++;
    } else {
      this.yellowMoves++;
    }
  }

  /**
   * Check winner for vertical.
   * @param column selected column.
   */
  private checkVertical(column: number): void {
    let count = 0;

    if ((this.rows - this.slectedRow + 1) > 4) {
      for (let i = this.slectedRow; i < this.slectedRow + 4; i++) {
        if (this.board[this.slectedRow][column] == this.board[i][column]) {
          count++;
        }
      }
    }
    if (count == 4) {
      this.winner = this.currentPlayer;
    }

  }

  /**
   * Check winner for horizontal.
   * @param column selected column.
   */
  private checkHorizontal(column: number): void {
    let count = 0;
    let start = column + 3;

    for (let i = 0; i < 4; i++) {
      count = 0;
      for (let j = start - i; j > start - i - 4; j--) {
        if (this.board[this.slectedRow][column] === this.board[this.slectedRow][j]) {
          count++;
        }
        if (j === 0 || j >= this.columns) {
          break;
        }
      }
      if (count == 4) {
        this.winner = this.currentPlayer;
        break;
      }
    }
  }

  /**
   * Check winner for diagonal.
   * @param column selected column.
   */
  private checkDiagonal(column: number): void {
    let count = 0;
    let step = 0;
    let start = column - 3;
    let currentRow;

    for (let i = start; i < start + 4; i++) {
      count = 0;
      for (let j = 0; j < 4; j++) {

        currentRow = this.slectedRow + 3 - j - step;

        if (i + j >= this.columns || i + j < 0 || currentRow > this.rows - 1 ||
          currentRow < 0
        ) {
          break;
        }
        if (this.board[this.slectedRow][column] === this.board[currentRow][i + j]) {
          count++;
        }

      }
      if (count == 4) {
        this.winner = this.currentPlayer;
        break;
      }
      step++;
    }
  }

  /**
   * Check winner for secondary diagonal.
   * @param column selected column.
   */
  private checkSecondaryDiagonal(column: number): void {
    let count = 0;
    let step = 0;
    let start = column - 3;
    let currentRow;

    for (let i = start; i < start + 4; i++) {
      count = 0;
      for (let j = 0; j < 4; j++) {

        currentRow = this.slectedRow - 3 + j + step;

        if (i + j >= this.columns || i + j < 0 || currentRow > this.rows - 1 ||
          currentRow < 0) {
          break;
        }
        if (this.board[this.slectedRow][column] === this.board[currentRow][i + j]) {
          count++;
        }

      }
      if (count == 4) {
        this.winner = this.currentPlayer;
        break;
      }
      step++;
    }
  }

  private checkDraw = async (): Promise<void> => {
    let count = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (!this.board[i][j]) {
          count++;
        }
      }
    }
    if (count == 0 && this.winner == undefined) {
      const result = await this.dialogService.showDialog(
        this.translationService.instant("dialogMessage.draw"),
        undefined,
        DialogType.draw);

      if (result) {
        this.initGame();
      } else {
        this.gameOver = true;
      }
    }
  }

  //#endregion

}
