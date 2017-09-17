import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { Company } from "../../model/company";
import { CompanyService } from "../company.service";
import { FormControl, Validators, FormBuilder, FormGroup ,NgModel} from "@angular/forms";
import { ServerDateTime } from "../../model/server_date_time";
import { ConfirmationService} from "primeng/components/common/api";
import { ConfirmDialogModule,SharedModule} from 'primeng/primeng';
import { GrowlModule,Message} from 'primeng/primeng';
import { ValidationService } from "../../validation.service";
import { MdDialog, MD_DIALOG_DATA, MdDialogRef ,MaterialModule} from '@angular/material';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [ValidationService]
})
export class CompanyComponent implements OnInit { 
  companys:Company[];
  public dt:ServerDateTime[];
  item: Company;
  companyForm: FormGroup;
  private sTimeout;
  name: string;
  editRowId:number=0;
  msgs: Message[] = [];
  loading:Boolean=true;
  toggleEdit(id){
    this.editRowId = id;
  }
  update(company){
    this.editRowId=0;
    this.companyService.update(company).subscribe(res => { });
    this.msgs.push({severity:'success', summary:'נשמר בהצלחה', detail:company.name +' נשמר '});
    this.refresh();
  }
  timeout() { 
    setTimeout(() => {
      this.timeout();
    }, 1000);
  }
  timeoutMSG() { 
    setTimeout(() => {
      this.clear();
    }, 7000);
  } 
  constructor(private formBuilder: FormBuilder,
    private companyService:CompanyService,
    private confirmationService: ConfirmationService,
    private validationService:ValidationService,public dialog: MdDialog) {
      this.companys = new Array<Company>();
      this.timeout(); 
      this.timeoutMSG(); 
  }
  onChangeEvent({target}){
    this.name = target.value;
  }
  greetMe(id:number){
    let name=this.companys.filter(item => item['id']==id)[0].name;
    this.confirmationService.confirm({
    message: `למחוק החברה ${name} `,
    header: 'מחיקה!!',
    icon: 'fa fa-question-circle',
    accept: () => {
      this.delete(id);
    },
    reject: () => {}
    });
  }
  getLastId(){
    if(this.companys.length==0) return 0;
    return this.companys[this.companys.length-1].id;
  }
  save() {
    let id = this.item.id;
    this.item = this.companyForm.value;
    this.item.created_at=this.dt['d'];
    this.item.created_at_sec=this.dt['t'];
     this.item.last_update=this.dt['d'];
    this.item.last_update_sec=this.dt['t'];
    if(this.item.name.length>0){
      this.companys.push(this.item);
      this.companyService.add(this.item).subscribe(res => { });
      this.companyForm.value.name='';
      this.refresh();
      this.msgs.push({severity:'success', summary:'נשמר בהצלחה', detail:this.item.name +' נשמר '});
      this.setForm();
    }
    
  }
  delete(id:number){
    this.companys= this.companys.filter(item => item['id']!=id);
    this.companyService.delete(id).subscribe(res => {});
    this.refresh();
     this.msgs.push({severity:'error', summary:'מחיקה', detail:'מחיקה'});
  }
  private setForm() {
    this.companyForm = this.formBuilder.group({
      name: [this.item.name,Validators.compose([ Validators.required])],
      created_at:[this.item.created_at]
    });
  }
  refresh(): void {
      this.editRowId=0;
      this.loadData();
  }
  ngOnInit() {
    this.editRowId=0;
    this.item = {name: '', id:0,created_at:'',created_at_sec:'',last_update:'',last_update_sec:'' };
    this.setForm();
     this.companyService.getCompanys().subscribe(res => {
      this.loading=false;
      if(!res['message']) {
         this.companys = res.reverse();
      }
     });
  }
  loadData() {
    this.companyService.getCompanys().subscribe(res => {
        this.loading=false;
        if(!res['message']) {
        this.companys = res.reverse();
        }
      });
  }
  clear() {
    this.msgs = [];
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddCompany, {
      width: '250px',
      data: { company:this}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.save();
      //this.animal = result;
    });
  }
}
@Component({
  selector: 'add-company',
  templateUrl: 'add-company.html',
  providers: [ValidationService]
})
export class AddCompany {
  constructor(
    public dialogRef: MdDialogRef<AddCompany>,
    @Inject(MD_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      this.dialogRef.close();
    }
    save(){
      console.log(this.data.company.companyForm.value);
      this.data.company.save();
      this.dialogRef.close();
    }
}