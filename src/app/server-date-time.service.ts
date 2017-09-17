import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ServerDateTime } from "./model/server_date_time";
import {Http} from '@angular/http';
import 'rxjs';
import * as AppConst from './app.const'; 
@Injectable()
export class ServerDateTimeService {
  http: Http;
  getDateTime(param:string='') :Observable<Array<ServerDateTime>>{
    return this.http.get(AppConst.API_ENDPOINT+'date_time/index.php'+param).map(x=>x.json());
  }
   constructor(private _http:Http) { 
    this.http = _http;
  }
  
  
}
