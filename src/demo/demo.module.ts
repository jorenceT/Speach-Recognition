import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';

import { SpeechRecognizionSubModule } from '../demo/speech-recognizion';
import { MainPageComponent } from './speech-recognizion/components/main-page/main-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DemoComponent, MainPageComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    SpeechRecognizionSubModule,
    FormsModule
  ],
  bootstrap: [DemoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoModule {}
