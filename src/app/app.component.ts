import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GamePopupHandlerError } from './core/popups-handlers';
import { DialogService } from './core/services';
import { DialogType } from './shared/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'connect4';
  constructor(private translate: TranslateService, private dialogService: DialogService) {
    translate.setDefaultLang('en');

    // test errors

    // throw new GamePopupHandlerError("Test message: Game Error", DialogType.unknown);
    // throw new Error('Test message: Random Error');
  }

  //#region UI events

  /**
   * The method is used for testing purposes only.
   */
  public onOpenDialog = async (): Promise<void> => {
    const result = await this.dialogService.showDialog('Test Draw', DialogType.draw);

    if (result) {
      // do something...
    } else {
      // end game...
    }
  }

  //#endregion

}
