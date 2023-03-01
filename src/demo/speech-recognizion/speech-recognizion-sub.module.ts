import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientPageComponent } from './components/client-page/client-page.component';
import { TaxProPageComponent } from './components/taxpro-page/taxpro-page.component';
import { MessageHandlerService } from './service/message-handler.service';
// import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ClientPageComponent, TaxProPageComponent],
  providers: [MessageHandlerService],
  exports: [ClientPageComponent, TaxProPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpeechRecognizionSubModule { }
