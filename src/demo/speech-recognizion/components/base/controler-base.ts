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
  public taxPro: boolean | undefined;
  private channel: any;





  @ViewChild('control') controlRef: ElementRef | undefined;

  constructor(
    public service: MessageHandlerService,
    protected ref: ChangeDetectorRef
  ) {
    this.speachService = new webkitSpeechRecognition();
    this.speachService.continuous = true;
    this.speachService.interimResults = true;
    this.speachService.onresult = (e: any) => {
      if (this.taxPro) {
        this.service.message = e.results[e.results.length - 1].item(0).transcript;
      } else {
        this.service.speakMessage = e.results[e.results.length - 1].item(0).transcript;
      }
      this.ref.detectChanges();
    };
    this.speachService.onend = (e: any) => {
      this.listerning = false;
      this.ref.detectChanges();
    };
    // this.channel = new BroadcastChannel('app-data');
    // this.channel.addEventListener('message', (event: any) => {
    //   // console.log(event.data);
    //   this.service.message = event.data;
    // });

  }
  listen() {
    if (this.listerning) {
      this.stop();
    } else {
      this.start();
    }
  }

  speak(message: string) {
    const utterThis = new SpeechSynthesisUtterance(message);
    synth.speak(utterThis);
  }

  updateMessage() {
    // const channel = new BroadcastChannel('taxpro-message');
    // channel.postMessage(this.service.message);
  }

  updateSpeakMessage() {
    // const channel = new BroadcastChannel('client-data');
    // channel.postMessage(this.service.message);
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
