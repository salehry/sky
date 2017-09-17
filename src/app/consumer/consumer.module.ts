import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerComponent } from './consumer/consumer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsumerService } from "./consumer.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import {GrowlModule,Message} from 'primeng/primeng';
import { AddConsumerComponent } from './add-consumer/add-consumer.component';
import { EditConsumerComponent } from './edit-consumer/edit-consumer.component';
//import {ErrorMessagesComponent} from '../error-messages/error-messages.component';
import {CalendarModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import { ValidErrModule } from "../valid-err/valid-err.module";
import { RouterModule, Routes } from '@angular/router';
import { TranslateService, TranslateModule } from "ng2-translate";
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
    CalendarModule,
    PasswordModule,
    ValidErrModule,
    RouterModule,
    TranslateModule
  ],
  exports : [ConsumerComponent,AddConsumerComponent,EditConsumerComponent,TranslateModule],
  declarations: [ConsumerComponent, AddConsumerComponent, EditConsumerComponent],
   providers: [{ provide: ConsumerService, useClass: ConsumerService },ConfirmationService]
})
export class ConsumerModule { }
