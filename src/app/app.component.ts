import { Component,OnInit,Input } from '@angular/core';
import { ServerDateTimeService } from "./server-date-time.service";
import { ServerDateTime } from "./model/server_date_time";
import { Router } from '@angular/router';
import { TranslateService } from "ng2-translate";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServerDateTimeService]
})
export class AppComponent implements OnInit{
  title = 'app';
  dt:ServerDateTime[];
  @Input()
  lan:any;
  changeLan(lan: string) {
    this.translate.use(lan);
    this.lan=lan;
  }
  constructor(private serverDateTimeService:ServerDateTimeService,
              private router:Router,
              private translate: TranslateService){
                translate.setDefaultLang('he');
                translate.use('he');
                this.lan=this.translate.currentLang;
                console.log(this.lan);
 }
  ngOnInit() {
    this.serverDateTimeService.getDateTime('').subscribe(res => {
         this.dt = res;
         //console.log(this.router.url)
     });   
  }
    public  isloged(){
        return this.router.url!='/login';
    }
}
