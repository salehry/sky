import { Declaration } from '@angular/language-service';
import { Component, OnInit, ViewContainerRef, Output, Input } from '@angular/core';
import { User } from "../../model/user";
import { Level } from "../../model/level";
import { UsersService } from "../users.service";
import { FormControl, Validators, FormBuilder, FormGroup, NgModel, ValidationErrors } from "@angular/forms";
import { ServerDateTime } from "../../model/server_date_time";
//import { ServerDateTimeService } from "../../server-date-time.service";
import { ValidationService } from "../../validation.service";
import { ConfirmationService} from "primeng/components/common/api";
import { ConfirmDialogModule,SharedModule} from 'primeng/primeng';
import { GrowlModule,Message} from 'primeng/primeng';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [/*ServerDateTimeService*/ValidationService]
})
export class AddUserComponent implements OnInit {
 


  public dt: ServerDateTime[];
  item: User;
  name: string;
  userForm: FormGroup;
  private sTimeout;
  editRowId:number=0;
  msgs: Message[] = [];
  userLevels: Level[]=[];
   agents: User[]=[];
  toggleEdit(id){
    this.editRowId = id;
  }
  loadLevels() {
    this.userService.getUserLevels().subscribe(res => {
       
        this.userLevels = res.reverse();
      
      });
    this.userService.getAgents().subscribe(res => {
       
        this.agents = res.reverse();
      
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
      //this.currentDateTime();
      this.timeout();
    }, 1000);
  }
   timeoutMSG() { 
    setTimeout(() => {
      this.clear();
    }, 7000);
  } 
  constructor(
    private formBuilder: FormBuilder,
    private userService:UsersService,
    //private serverDateTimeService:ServerDateTimeService,
    private confirmationService: ConfirmationService, 
    private validationService:ValidationService,
    private router:Router) { 
      this.timeout(); 
      this.timeoutMSG(); 
    }

  onChangeEvent({target}){
    this.name = target.value;
  }
  
  save() {
    let id = this.item.id;
    this.item = this.userForm.value;
    this.item.created_at=this.dt['d'];
    this.item.created_at_sec=this.dt['t'];
     this.item.last_update=this.dt['d'];
    this.item.last_update_sec=this.dt['t'];
    this.userService.add(this.item).subscribe(res => { });
    
    this.userForm.value.username='';
    this.msgs.push({severity:'success', summary:'נשמר בהצלחה', detail:this.item.username +' נשמר '});
   // this.setForm();
   this.router.navigate(['/']);
  }
 
  private setForm() {
    this.userForm = this.formBuilder.group({
      username: [this.item.username, Validators.required],
      password: [null, Validators.required],
      re_password:[null,this.validationService.checkPassword],
      email: [this.item.email, this.validationService.emailValidation],
      national_id:[this.item.national_id,this.validationService.legalPersonalId],
      firstname:[this.item.firstname],
      lastname:[this.item.lastname],
      phone:[this.item.phone],
      mobile:[this.item.mobile,this.validationService.phoneValidation],
      birthday:[this.item.birthday],
      level_id:[this.item.level_id,this.validationService.levelValidation]
    });
  }
  
  ngOnInit() {
    this.loadLevels() ;
    this.editRowId=0;
    this.item = {
        id: null,
        username: '',
        password:'',
        email: '',
        national_id: '',
        firstname: '',
        lastname: '',
        phone: '',
        mobile: '',
        birthday: '',
        birthday_sec: '',
        created_at: '',
        created_at_sec: '',
        last_update: '',
        last_update_sec: '',
        level_id: 0,
        lang:'he'
      };
     this.setForm();
    
  }
  
  clear() {
    this.msgs = [];
  }

}
