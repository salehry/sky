import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent ,AddCompany} from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from "./company.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import {GrowlModule,Message} from 'primeng/primeng';
import { ValidErrModule } from "../valid-err/valid-err.module";
import { TranslateService, TranslateModule } from "ng2-translate";
import {MaterialModule,MdNativeDateModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule, 
    SharedModule ,
    BrowserAnimationsModule,
    GrowlModule,
    ValidErrModule,
    TranslateModule,
    MaterialModule
  ],
  exports : [CompanyComponent,TranslateModule,ValidErrModule],
  declarations: [CompanyComponent],
  providers: [{ provide: CompanyService, useClass: CompanyService },TranslateService]
})
export class CompanyModule { }
