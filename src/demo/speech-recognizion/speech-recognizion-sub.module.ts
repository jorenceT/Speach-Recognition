import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { InputComponent, ButtonComponent } from './components';
import { DropDownComponent } from './components/dropdown/dropdown.component';
// import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InputComponent, ButtonComponent, DropDownComponent],
  exports: [InputComponent, ButtonComponent, DropDownComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpeechRecognizionSubModule { }
