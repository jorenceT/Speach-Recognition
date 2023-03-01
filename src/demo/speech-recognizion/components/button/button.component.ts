import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlerBase } from '../base/controler-base';
import { commentHandler } from '../base/helper-class';
import { controlType } from '../Interface/tab-data-model';

@Component({
  selector: 'button-speach-enabled',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ControlerBase {
  public command = 'command';
  public tabIndex = 0;
  public name = '';
  public listerning = false;
  public type = 'text';
  public message = '';
  public previousFinalData = '';
  public controlType: any;

  constructor(
    private refInt: ChangeDetectorRef
  ) {
    super(
      refInt);
    this.controlType = controlType.button;
  }

  executeFunction() {
    this.functionExecuteCustom.emit(this.name);
  }

  protected localCommandHandler(message: string): void {
    if (commentHandler(['Click'], message)) {
      this.functionExecuteCustom.emit(this.name);
    }
    this.ref.detectChanges();
  }
}
