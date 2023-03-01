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
const synth = window.speechSynthesis;
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
  public receivedMessage = '';
  public speakMessage = '';


  @Input() set focusinCustom(data: TabData) {
    this.name = data.name ?? '';
    this.type = data.type ?? '';
    if (data.active) {
      this.controlRef?.nativeElement?.focus();
      this.start();
    } else {
      if (this.listerning) {
        this.stop();
      }
    }
    this.tabIndex = data.index ?? null;
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
      this.message = "";
      for (const line of e.results) {
        this.message += line[0].transcript.trim() + ". ";
      }
      this.ref.detectChanges();
    };
    this.speachService.onend = (e: any) => {
      this.listerning = false;
      this.ref.detectChanges();
    };
  }

  concatString() {
    this.message = this.message.concat(this.receivedMessage);
  }

  listen() {
    if (this.listerning) {
      this.stop();
    } else {
      this.start();
    }
  }

  speak() {
    const utterThis = new SpeechSynthesisUtterance(this.speakMessage);
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

  clearTextToSpeech() {
    this.speakMessage = '';
  }
  clearSpeechToText() {
    this.message = '';
    this.listerning = false;
    this.speachService.stop();
  }
}
