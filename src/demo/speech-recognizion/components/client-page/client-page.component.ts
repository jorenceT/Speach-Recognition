import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Output,
} from '@angular/core';
import { MessageHandlerService } from '../../service/message-handler.service';
import { ControlerBase } from '../base/controler-base';
import {
  commentHandler,
  GLOBAL_COMMAND,
  parseNumericTextToNumber,
} from '../base/helper-class';
import { controlType, inputType, TabData } from '../Interface/tab-data-model';

@Component({
  selector: 'client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPageComponent extends ControlerBase {

  constructor(
    private serviceInit: MessageHandlerService,
    private refInit: ChangeDetectorRef
  ) {
    super(
      serviceInit,
      refInit);
      this.taxPro = false;
  }
  public tabIndex = 0;
  public name = '';
  public listerning = false;
  public type = '';
  command = '';

}
