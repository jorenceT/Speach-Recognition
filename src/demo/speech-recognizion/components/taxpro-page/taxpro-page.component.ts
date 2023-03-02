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
  selector: 'taxpro-page',
  templateUrl: './taxpro-page.component.html',
  styleUrls: ['./taxpro-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxProPageComponent extends ControlerBase {

  constructor(
    private serviceInit: MessageHandlerService,
    private refInit: ChangeDetectorRef
  ) {
    super(
      serviceInit, 
      refInit);
      this.taxPro = true;
  }
  public listerning = false;
}