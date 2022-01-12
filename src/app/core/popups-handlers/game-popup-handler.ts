import { ErrorHandler, Injectable } from '@angular/core';
import { DialogType } from '@app-enums';
import { DialogService } from '@app-services';
import { TranslateService } from '@ngx-translate/core';
import { GamePopupHandlerError } from '.';

@Injectable()
export class GamePopupHandler implements ErrorHandler {
  constructor(
    private dialogService: DialogService,
    private translationService: TranslateService
  ) {}

  handleError(error: any): void {
    if (error instanceof GamePopupHandlerError) {
      this.dialogService.showDialog(
        error.message,
        (error as GamePopupHandlerError).dialogType
      );
    } else {
      this.dialogService.showDialog(
        this.translationService.instant('dialogMessage.unknown'),
        DialogType.unknown
      );
    }
  }
}
