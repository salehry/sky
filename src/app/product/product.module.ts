import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from "./../company/company.service";
import { ProductService } from "./product.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import { GrowlModule, Message, DataTableModule, PaginatorModule } from 'primeng/primeng';
import { ValidErrModule } from "../valid-err/valid-err.module";
import { TranslateService, TranslateModule } from "ng2-translate";
import { MaterialModule,MdNativeDateModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

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
    MaterialModule,
    DataTableModule,
    RouterModule,PaginatorModule,
  ],
  exports : [ProductComponent,AddProductComponent,EditProductComponent,TranslateModule,ValidErrModule],
  declarations: [ProductComponent, AddProductComponent, EditProductComponent],
  providers:[{ provide: ProductService, useClass: ProductService },{ provide: CompanyService, useClass: CompanyService },TranslateService],
  entryComponents: [
    AddProductComponent,EditProductComponent
  ],
})
export class ProductModule { }
