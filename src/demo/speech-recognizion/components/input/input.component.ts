import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VoiceRecognizion } from '../../services/voice-recognizion.service';
import { ControlerBase } from '../base/controler-base';
import { commentHandler } from '../base/helper-class';
import { controlType } from '../Interface/tab-data-model';

@Component({
  selector: 'input-speach-enabled',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends ControlerBase {
  public command = 'command';
  public tabIndex = 0;
  public name = '';
  public listerning = false;
  public type = 'button';
  public message = '';
  public previousFinalData = '';
  public controlType: any;

  constructor(
    // private serviceInt: VoiceRecognizion,
    private refInt: ChangeDetectorRef
  ) {
    super(
      // serviceInt, 
      refInt);
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
      this.command = 'clear';
    } else {
      this.message = message;
    }
  }
}
