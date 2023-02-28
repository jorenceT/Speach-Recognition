import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { InputComponent, ButtonComponent } from './components';
// import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InputComponent, ButtonComponent],
  exports: [InputComponent, ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpeechRecognizionSubModule {}
