import { Injectable } from "@angular/core";
declare var webkitSpeechRecognition: any;

@Injectable({ providedIn: 'root' })
export class VoiceRecognizion {

    speachService: any = new webkitSpeechRecognition();


    start() {
        this.speachService.start();
    }

    stop() {
        this.speachService.stop();
    }
    onresult(e: any) {
        this.speachService.onresult = e;
    }
    onend(e: any) {
        this.speachService.onend = e;
    }

    continuous(e: boolean) {
        this.speachService.continuous = e;
    }

    interimResults(e: boolean) {
        this.speachService.interimResults = e;
    }
}