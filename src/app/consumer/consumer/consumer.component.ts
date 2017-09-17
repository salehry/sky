import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { User} from "../../model/user";
import { Consumer} from "../../model/consumer";
import { ConsumerService } from "../consumer.service";
import { FormControl, Validators, NgModel, FormGroup,FormBuilder} from "@angular/forms";
import { ServerDateTime } from "../../model/server_date_time";
//import { ServerDateTimeService } from "../../server-date-time.service";
import { ConfirmationService} from "primeng/components/common/api";
import { ConfirmDialogModule,SharedModule} from 'primeng/primeng';
import { GrowlModule,Message} from 'primeng/primeng';
import { ValidationService } from "../../validation.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css'],
  providers: [/*ServerDateTimeService*/ValidationService]
})
export class ConsumerComponent implements OnInit {
  consumers:Consumer[];
  public loading:Boolean=true;
  public dt:ServerDateTime[];
  item: Consumer;
  name: string;
  private sTimeout;
  editRowId:number=0;
  msgs: Message[] = [];
  toggleEdit(id){
    this.editRowId = id;
  }
  searchForm: FormGroup;
  private setForm() {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }
  /*private currentDateTime() { this.serverDateTimeService.getDateTime().subscribe(res => {
      if(!res['message']) {
      this.dt = res;
      }
    });
  }*/
  timeout() { 
    setTimeout(() => {
     // this.currentDateTime();
      this.timeout();
    }, 1000);
  }
   timeoutMSG() { 
    setTimeout(() => {
      this.clear();
    }, 7000);
  } 
  constructor(private consumerService:ConsumerService,
    //private serverDateTimeService:ServerDateTimeService,
    private confirmationService: ConfirmationService,private formBuilder: FormBuilder,private validationService:ValidationService,
    private router:Router) { 
      this.consumers = new Array<Consumer>();
      this.timeout(); 
      this.timeoutMSG(); 
    }

  onChangeEvent({target}){
    this.name = target.value;
  }
  greetMe(id:number){
    
    let username=this.consumers.filter(item => item['id']==id)[0].username;
    console.log(username);
    this.confirmationService.confirm({
    message: `למחוק החברה ${username} `,
    header: 'מחיקה!!',
    icon: 'fa fa-question-circle',
    accept: () => {
      this.delete(id);
    },
    reject: () => {}
    });
  }
  getLastId(){
    if(this.consumers.length==0) return 0;
    return this.consumers[this.consumers.length-1].id;
  }
 
  delete(id:number){
    this.consumers= this.consumers.filter(item => item['id']!=id);
    this.consumerService.delete(id).subscribe(res => {});
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
    this.consumerService.getConsumers().subscribe(res => {
        this.loading=false;
        if(!res['message']) {
          this.consumers = res.reverse();
        
        }
        else{
          this.consumers =[];
        }
      });
  }
    loadSerchData(search) {
    this.consumerService.getSearch(search).subscribe(res => {
        this.loading=false;
        if(!res['message']) {
          this.consumers = res.reverse();
          
        }else{
          this.consumers =[];
        }
      });
  }
  clear() {
    this.msgs = [];
  }
  search(){
    let search:string=this.searchForm.value.search;
    if(search!=''){
      this.loadSerchData(search);
    }
    else{
      this.loadData();
    }
  }
}
