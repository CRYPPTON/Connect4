import { ErrorHandler, Injectable } from '@angular/core';
import { DialogType } from '@app-enums';
import { DialogService, GameEngineService } from '@app-services';
import { TranslateService } from '@ngx-translate/core';
import { GamePopupHandlerError } from '.';

@Injectable()
export class GamePopupHandler implements ErrorHandler {
  constructor(
    private dialogService: DialogService,
    private translationService: TranslateService,
    private gameEngineService: GameEngineService
  ) { }

  handleError = async (error: any): Promise<void> => {
    if (error instanceof GamePopupHandlerError) {
      const result = await this.dialogService.showDialog(
        error.message,
        (error as GamePopupHandlerError).dialogType,
        this.gameEngineService.winner,
      );
      if (result) {
        this.gameEngineService.initGame();
      } else {
        this.gameEngineService.gameOver = true;
      }
    } else {
      this.dialogService.showDialog(
        this.translationService.instant('dialogMessage.unknown'),
        DialogType.unknown
      );
    }
  }
}
