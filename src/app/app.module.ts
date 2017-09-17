import { CompanyComponent,AddCompany } from './company/company/company.component';
import { UsersComponent } from './users/users/users.component';
import { ConsumerComponent } from './consumer/consumer/consumer.component';
import { AddConsumerComponent}  from './consumer/add-consumer/add-consumer.component';
import { EditConsumerComponent}  from './consumer/edit-consumer/edit-consumer.component';
import { LoginComponent } from './login/login/login.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { BrowserModule ,} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompanyModule } from "./company/company.module";
import { UsersModule } from "./users/users.module";
import { ConsumerModule } from "./consumer/consumer.module";
import { LoginModule } from "./login/login.module";
import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import { ServerDateTime } from "./model/server_date_time";
import { ServerDateTimeService } from "./server-date-time.service";
import { LocalStorageService } from "./local-storage.service";
import { ValidationService } from "./validation.service";
import { AuthenticationService } from "./login/authentication.service"; 
import { AuthGuard } from "./login/auth.guard";
//import { CookieService } from 'angular2-cookie/services/cookies.service';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Http } from "@angular/http";
import { AppRoutingModule } from "./app.module.routing";
import {MaterialModule,MdNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'hammerjs';
import { ProductModule } from "./product/product.module";
//import { DataTablesModule } from 'angular-datatables';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
@NgModule({
  declarations: [
    AppComponent,AddCompany
  ], 
  imports: [
    BrowserModule,
    CompanyModule,
    ConsumerModule,
    UsersModule,
    ProductModule,
    LoginModule, 
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    MaterialModule,
    BrowserAnimationsModule,
    MdNativeDateModule,
   // DataTablesModule
  ],
  exports:[MaterialModule],
  providers: [
    { 
      provide: ServerDateTimeService, 
      useClass: ServerDateTimeService 
    },
    { 
      provide: ValidationService, 
      useClass: ValidationService 
    }, 
    AuthGuard,
    AuthenticationService,
    LocalStorageService
  ], 
   
  bootstrap: [AppComponent],
  entryComponents: [AddCompany],
})
export class AppModule { }
