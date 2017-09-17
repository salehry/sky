import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from "./users.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService, SharedModule,DataTableModule ,PaginatorModule} from 'primeng/primeng';
import {GrowlModule,Message} from 'primeng/primeng';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
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
    DataTableModule,
    ConfirmDialogModule, 
    SharedModule ,
    BrowserAnimationsModule,
    GrowlModule,
    CalendarModule,
    PasswordModule,
    ValidErrModule,
    RouterModule,TranslateModule,PaginatorModule
  ],
  exports : [UsersComponent,AddUserComponent,EditUserComponent,TranslateModule],
  declarations: [UsersComponent, AddUserComponent, EditUserComponent],
  providers: [{ provide: UsersService, useClass: UsersService },ConfirmationService]
})
export class UsersModule { }
