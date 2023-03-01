import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Output,
} from '@angular/core';
import { ControlerBase } from '../base/controler-base';
import {
  commentHandler,
  GLOBAL_COMMAND,
  parseNumericTextToNumber,
} from '../base/helper-class';
import { controlType, inputType, TabData } from '../Interface/tab-data-model';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {

  Taxpro = false;

  constructor(
    private refInit: ChangeDetectorRef
  ) {
  }


  setScreen(data: string) {
    if (data == "Taxpro") {
      this.Taxpro = true;
    } else {
      this.Taxpro = false;
    }
  }
}
