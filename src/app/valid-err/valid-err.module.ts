import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidErrComponent } from './valid-err/valid-err.component';
import { TranslateService, TranslateModule } from "ng2-translate";
@NgModule({
  imports: [
    CommonModule,TranslateModule
  ],
  exports:[ValidErrComponent,TranslateModule],
  declarations: [ValidErrComponent]
})
export class ValidErrModule { }
