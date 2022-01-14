import { DialogType, GamePlayer } from '@app-enums';

export interface GameDialogType {
  message: string;
  player: GamePlayer;
  dialogType: DialogType;
}
