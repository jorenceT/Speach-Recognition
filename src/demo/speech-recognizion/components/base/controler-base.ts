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
import { MessageHandlerService } from '../../service/message-handler.service';
import { controlType, TabData, VoiceRecognizion } from '../Interface/tab-data-model';
import { commentHandler, GLOBAL_COMMAND } from './helper-class';
declare var webkitSpeechRecognition: any;
const synth = window.speechSynthesis;
@Directive()
export abstract class ControlerBase {
  public abstract listerning: boolean;
  public speachService: VoiceRecognizion;
  



  @ViewChild('control') controlRef: ElementRef | undefined;

  constructor(
    public service: MessageHandlerService,
    protected ref: ChangeDetectorRef
  ) {
    this.speachService = new webkitSpeechRecognition();
    this.speachService.continuous = true;
    this.speachService.interimResults = true;
    this.speachService.onresult = (e: any) => {
      this.service.message = e.results[e.results.length - 1].item(0).transcript;
      this.ref.detectChanges();
    };
    this.speachService.onend = (e: any) => {
      this.listerning = false;
      this.ref.detectChanges();
    };
  }

  listen() {
    if (this.listerning) {
      this.stop();
    } else {
      this.start();
    }
  }

  speak() {
    const utterThis = new SpeechSynthesisUtterance(this.service.speakMessage);
    synth.speak(utterThis);
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

  clear(dataToClear: string) {
    if (dataToClear == 'message') {
      this.service.message = ''
    } else {
      this.service.speakMessage = '';
    }
  }
}
