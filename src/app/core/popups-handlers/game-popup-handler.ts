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
  ) {}

  handleError(error: any): void {
    // if (error instanceof GamePopupHandlerError) {
    //   this.dialogService.showDialog(
    //     error.message,
    //     this.gameEngineService.winner,
    //     (error as GamePopupHandlerError).dialogType
    //   );
    // } else {
    //   // this.dialogService.showDialog(
    //   //   this.translationService.instant('dialogMessage.unknown'),
    //   //   this.gameEngineService.winner,
    //   //   DialogType.unknown
    //   // );
    // }
  }
}
