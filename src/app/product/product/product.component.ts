import { Component, OnInit } from '@angular/core';
import { ValidationService } from "../../validation.service";
import { Product } from "../../model/product";
import { GrowlModule,Message,ConfirmDialogModule,SharedModule,DataTableModule,PaginatorModule} from 'primeng/primeng';
import { FormControl, Validators, NgModel, FormGroup,FormBuilder} from "@angular/forms";
import { ProductService } from "../product.service";
import { ConfirmationService} from "primeng/components/common/api";
import { CompanyService } from "../../company/company.service";
import { Router } from '@angular/router';
import {DataSource} from '@angular/cdk/collections';
import { Company } from "../../model/company";
import { MdDialog, MD_DIALOG_DATA, MdDialogRef ,MaterialModule} from '@angular/material';
import { AddProductComponent } from "../add-product/add-product.component";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ValidationService]
})
export class ProductComponent implements OnInit {
  products:Product[];
  companies:Company[]
  item:Product;
  name: string;
  private sTimeout;
  editRowId:number=0;
  msgs: Message[] = [];
  toggleEdit(id){
    this.editRowId = id;
  }
  public loading:Boolean=true;
  searchForm: FormGroup;
  private setForm() {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }
  clear() {
    this.msgs = [];
  }
  timeoutMSG() { 
    setTimeout(() => {
      this.clear();
    }, 7000);
  } 
  constructor(
      private productService:ProductService,
      private companyService:CompanyService,
      private confirmationService: ConfirmationService,
      private formBuilder: FormBuilder,
      private validationService:ValidationService,
      public dialog: MdDialog,
      private router:Router) { 
        this.products = new Array<Product>();
        this.companies = new Array<Company>();
        this.timeoutMSG(); 
      }

      onChangeEvent({target}){
        this.name = target.value;
      }
      greetMe(id:number){
        
        let name=this.products.filter(item => item['id']==id)[0].name;
        this.confirmationService.confirm({
        message: `למחוק חבילה ${name} `,
        header: 'מחיקה!!',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.delete(id);
        },
        reject: () => {}
        });
      }
      getLastId(){
        if(this.products.length==0) return 0;
        return this.products[this.products.length-1].id;
      }
      getCompanyName(id:number){
        let companies:Company[]=this.companies.filter(item => item['id']==id);
        return companies.length>0 && companies[0].name;
      }
      delete(id:number){
        this.products= this.products.filter(item => item['id']!=id);
        this.productService.delete(id).subscribe(res => {});
        this.refresh();
         this.msgs.push({severity:'error', summary:'מחיקה', detail:'מחיקה'});
      }
      
      refresh(): void {
          this.editRowId=0;
          this.loadData();
      }
      ngOnInit() {
        this.editRowId=0;
        this.setForm();
        this.loadData();
      }
      loadData() {
        this.productService.getProducts().subscribe(res => {
           this.loading=false;
            if(!res['message']) {
            this.products = res.reverse();
            }
          });
          this.companyService.getCompanys().subscribe(res => {
            this.loading=false;
             if(!res['message']) {
             this.companies = res.reverse();
             }
           });
      }
      loadSearchData(search) {
        this.productService.getSearch(search).subscribe(res => {
            this.loading=false;
            if(!res['message']) {
              this.products = res.reverse();
            }
            else{
              this.products=[];
            }
          });
      }
      
      search(){
        let search:string=this.searchForm.value.search;
        if(search!=''){
          this.loadSearchData(search);
        }
        else{
          this.loadData();
        }
      }
      openDialog(): void {
        let dialogRef = this.dialog.open(AddProductComponent, {
          width: '250px',
          data: { pruduct:this}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }

}
