import { Declaration } from '@angular/language-service';
import { Component, OnInit, ViewContainerRef, Output, Input } from '@angular/core';
import { Consumer } from "../../model/consumer";
import { User } from "../../model/user";
import { Level } from "../../model/level";
import { ConsumerService } from "../consumer.service";
import { FormControl, Validators, FormBuilder, FormGroup, NgModel, ValidationErrors } from "@angular/forms";
import { ServerDateTime } from "../../model/server_date_time";
//import { ServerDateTimeService } from "../../server-date-time.service";
import { ValidationService } from "../../validation.service";
import { ConfirmationService} from "primeng/components/common/api";
import { ConfirmDialogModule,SharedModule} from 'primeng/primeng';
import { GrowlModule,Message} from 'primeng/primeng';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-consumer',
  templateUrl: './add-consumer.component.html',
  styleUrls: ['./add-consumer.component.css'],
  providers: [/*ServerDateTimeService*/ValidationService]
})
export class AddConsumerComponent implements OnInit {
  public dt: ServerDateTime[];
  item: Consumer;
  consumerForm: FormGroup;
  agents: User[]=[];
  loadAgents() {
    this.consumerService.getAgents().subscribe(res => {
        this.agents = res.reverse();
      });
  }
  constructor(
    private formBuilder: FormBuilder,
    private consumerService:ConsumerService,
    //private serverDateTimeService:ServerDateTimeService,
    private confirmationService: ConfirmationService, 
    private validationService:ValidationService,
    private router:Router) { 
  }
  save() {
    let id = this.item.id;
    this.item = this.consumerForm.value;
    this.item.username=this.item.email;
    this.item.mobile=this.item.phone;
    this.consumerService.add(this.item).subscribe(res => { 
      this.leavePage();
    });
  }
  private leavePage(){
    this.router.navigate(['/consumers']);
  }
  private setForm() {
    this.consumerForm = this.formBuilder.group({
      username: [this.item.email],
      parent: [null, Validators.required],
      email: [this.item.email],
      national_id:[this.item.national_id],
      firstname:[this.item.firstname, Validators.required],
      lastname:[this.item.lastname, Validators.required],
      phone:[this.item.phone,this.validationService.phoneValidation],
      mobile:[this.item.phone],
      birthday:[this.item.birthday],
      level_id:[4]
    });
  }
  ngOnInit() {
    this.loadAgents() ;
    this.item = {
        id: null,
        username: '',
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
        level_id: 4,
        parent:null,
        parent_name:''
      };
     this.setForm();
  }
}
