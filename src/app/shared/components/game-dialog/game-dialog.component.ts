import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameDialogType } from '@app-models';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss']
})
export class GameDialogComponent {

  //#region Class properties

  public icon: string;
  public styleClass: string;

  //#endregion

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameDialogType) {
    if (data.dialogType == 'success') {
      this.icon = 'check_circle_outline';
      this.styleClass = 'success-icon';
    } else if (data.dialogType == 'draw') {
      this.icon = 'sms_failed';
      this.styleClass = 'draw-icon';
    } else {
      this.icon = 'error_outline';
      this.styleClass = 'failure-icon';
    }
  }

}
