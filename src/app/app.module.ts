import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyCustomDirective } from './directives/my-custom.directive';
import { MyCustom2Directive } from './directives/my-custom2.directive';
import { EnglishOnlyDirective } from './directives/english-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyCustomDirective,
    MyCustom2Directive,
    EnglishOnlyDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
