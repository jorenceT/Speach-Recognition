import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { each, includes } from 'lodash-es';
import { CHECKBOX_ACCURATE_SELECTION } from '../../constants/input.constants';
import { ControlerBase } from '../base/controler-base';
import { commentHandler } from '../base/helper-class';
import { controlType, inputType, TabData } from '../Interface/tab-data-model';

@Component({
  selector: 'input-speach-enabled',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends ControlerBase {
  public tabIndex = 0;
  public name = '';
  public listerning = false;
  public type = 'button';
  public message = '';
  public previousFinalData = '';
  public controlType: any;
  public isChecked = '';
  constructor(
    private refInt: ChangeDetectorRef
  ) {
    super(refInt);
    this.controlType = controlType.input;
  }

  // test() {
  //   var val = this.globalMessageHandler('focus zero');
  //   console.log(val);
  //   var val = this.globalMessageHandler('focus one');
  //   console.log(val);
  // }

  protected localCommandHandler(message: string) {
    if (commentHandler(['clear', 'delete', 'erase'], message)) {
      this.message = '';
    } else {
      if (this.type === inputType.checkbox) {
        message = message.replace(/\s/g, '').toLowerCase();
        each(CHECKBOX_ACCURATE_SELECTION, (value, key) => {
          if (includes(value, message)) {
            this.isChecked = key;
            return false;
          }
          return true;
        })
      }
      this.message = message;
      this.ref.detectChanges();
    }
  }
}
