import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  //#region Class properties

  columns: number;
  rows: number;

  //#endregion

  constructor() { }

  ngOnInit(): void {
    this.columns = 7  ;
    this.rows = 6;

    this.setBorderSize();
  }

  /**
  * Set game board size.
  */
  private setBorderSize(): void {
    const element = (document.querySelector('.game-board') as HTMLElement);
    element.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`
  }

}
