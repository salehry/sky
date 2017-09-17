import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { User } from "../../model/user";
import { UsersService } from "../users.service";
import { FormControl, Validators, NgModel, FormGroup,FormBuilder} from "@angular/forms";
import { ServerDateTime } from "../../model/server_date_time";
//import { ServerDateTimeService } from "../../server-date-time.service";
import { ConfirmationService} from "primeng/components/common/api";
import { ConfirmDialogModule,SharedModule,DataTableModule,PaginatorModule} from 'primeng/primeng';
import { GrowlModule,Message} from 'primeng/primeng';
import { ValidationService } from "../../validation.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [/*ServerDateTimeService*/ValidationService]
})
export class UsersComponent implements OnInit {
  users:User[];
  public dt:ServerDateTime[];
  item: User;
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
  constructor(private userService:UsersService
    ,//private serverDateTimeService:ServerDateTimeService,
    private confirmationService: ConfirmationService,private formBuilder: FormBuilder,private validationService:ValidationService,
    private router:Router) { 
      this.users = new Array<User>();
      this.timeout(); 
      this.timeoutMSG(); 
    }

  onChangeEvent({target}){
    this.name = target.value;
  }
  greetMe(id:number){
    
    let username=this.users.filter(item => item['id']==id)[0].username;
    console.log(username);
    this.confirmationService.confirm({
    message: `למחוק משתמש ${username} `,
    header: 'מחיקה!!',
    icon: 'fa fa-question-circle',
    accept: () => {
      this.delete(id);
    },
    reject: () => {}
    });
  }
  getLastId(){
    if(this.users.length==0) return 0;
    return this.users[this.users.length-1].id;
  }
 
  delete(id:number){
    this.users= this.users.filter(item => item['id']!=id);
    this.userService.delete(id).subscribe(res => {});
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
    /*this.userService.checkUser().subscribe(res => {
      console.log(res);
    });*/
  }
  loadData() {
    this.userService.getUsers().subscribe(res => {
       this.loading=false;
        if(!res['message']) {
        this.users = res.reverse();
        }
      });
  }
  loadSearchData(search) {
    this.userService.getSearch(search).subscribe(res => {
        this.loading=false;
        if(!res['message']) {
          this.users = res.reverse();
        }
        else{
          this.users=[];
        }
      });
  }
  clear() {
    this.msgs = [];
  }
  search(){
    let search:string=this.searchForm.value.search;
    //console.log(search);
    //this.loadData();
    if(search!=''){
      this.loadSearchData(search);
    }
    else{
      this.loadData();
    }
  }
}
