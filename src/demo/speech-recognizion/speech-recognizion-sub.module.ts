import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { InputComponent} from './components';
import { FormsModule } from '@angular/forms';
// import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputComponent],
  exports: [InputComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpeechRecognizionSubModule { }
