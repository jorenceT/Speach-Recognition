import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { controlType, TabData, VoiceRecognizion } from '../Interface/tab-data-model';
import { commentHandler, GLOBAL_COMMAND } from './helper-class';
declare var webkitSpeechRecognition: any;
@Directive()
export abstract class ControlerBase {
  public abstract tabIndex: number;
  public abstract name: string;
  public abstract listerning: boolean;
  public abstract type: string;
  public abstract message: string;
  public abstract previousFinalData: string;
  public abstract controlType: any;
  public speachService: VoiceRecognizion;
  

  @Input() set focusinCustom(data: TabData) {
    this.name = data.name?? '';
    this.type = data.type?? '';
    if (data.active) {
      this.controlRef?.nativeElement?.focus();
      this.start();
    } else {
      if (this.listerning) {
        this.stop();
      }
    }
    this.tabIndex = data.index?? null;
    this.ref.detectChanges();
  }

  @ViewChild('control') controlRef: ElementRef | undefined;

  @Output() focusoutCustom = new EventEmitter<number>();
  @Output() functionExecuteCustom = new EventEmitter<string>();
  @Output() executeGlobalCommand = new EventEmitter<string>();

  constructor(
    protected ref: ChangeDetectorRef
  ) {
    this.speachService = new webkitSpeechRecognition();
    this.speachService.continuous = true;
    this.speachService.interimResults = true;
    this.speachService.onresult = (e: any) => {
      var message = e.results[e.results.length - 1].item(0).transcript;
      this.messageHandler(message, e);
      if (e.results[e.results.length - 1].isFinal) {
        this.previousFinalData = this.message;
      }
      this.ref.detectChanges();
    };
    this.speachService.onend = (e: any) => {
      this.listerning = false;
      this.ref.detectChanges();
    };
  }

  clearGlobalCommandTextFromField(e: any, command: string) {
    if (e.results.length >= 2) {
      var splitedData = this.message.split(command);
      this.message = splitedData[0];
      this.message = this.message ? this.previousFinalData : this.message;
    } else {
      this.message = '';
    }
  }

  listen() {
    this.controlRef?.nativeElement?.focus();
    if (this.listerning) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (!this.listerning) {
      this.listerning = true;
      this.speachService.start();
    }
  }

  stop() {
    if (this.listerning) {
      this.listerning = false;
      this.speachService.stop();
    }
  }

  globalMessageHandler(message: string, e: any): boolean {
    var result = false;
    if (message) {
      for (const key in GLOBAL_COMMAND) {
        (GLOBAL_COMMAND as any)[key].forEach((value: string) => {
          if (message.includes(value)) {
            this.clearGlobalCommandTextFromField(e, value);
            this.previousFinalData = this.message;
            this.executeGlobalCommand.emit(message);
            message = '';
            result = true;
          }
        });
      }
    }
    return result;
  }

  messageHandler(message: string, e: any) {
    if (this.controlType === controlType.global) {
      this.localCommandHandler(message);
    } else if (
      !this.globalMessageHandler(message, e) &&
      !this.commonCommandHandler(message)
    ) {
      this.localCommandHandler(message);
    }
  }

  commonCommandHandler(message: string): boolean {
    if (commentHandler(['tabout', 'next', 'tab', 'out'], message)) {
      this.stop();
      this.focusoutCustom.emit(this.tabIndex + 1);
      return true;
    } else if (commentHandler(['stop', 'abort'], message)) {
      this.stop();
      return true;
    } else if (commentHandler(['previous', 'shift tab'], message)) {
      this.focusoutCustom.emit(this.tabIndex - 1);
      return true;
    }
    return false;
  }
  protected abstract localCommandHandler(message: string): void;
}
