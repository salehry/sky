import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Consumer } from "../model/consumer";
import { User } from "../model/user";
import { Level } from "../model/level";
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs';
import { AuthenticationService } from "../login/authentication.service";
import * as AppConst from './../app.const'; 

@Injectable()
export class ConsumerService {
  http: Http;
  headers: Headers;
  options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  getConsumers() :Observable<Array<Consumer>>{
    return this.http.get(this.apiRoot+'consumer/get.php', this.options).map(x=>x.json());
  }
  getConsumer(id:number) :Observable<Consumer>{
    return this.http.get(this.apiRoot+'consumer/get.php?id='+id, this.options).map(x=>x.json());
  }
  getSearch(search:string) :Observable<Array<Consumer>>{
    return this.http.get(this.apiRoot+'consumer/get.php?search='+search, this.options).map(x=>x.json());
  }
  getUserLevels() :Observable<Array<Level>>{
    return this.http.get(this.apiRoot+'user/get_levels.php', this.options).map(x=>x.json());
  }
  getAgents() :Observable<Array<User>>{
    return this.http.get(this.apiRoot+'user/get.php?group=agent', this.options).map(x=>x.json());
  }
  
  add(consumer:Consumer) {
    return this.http.post(this.apiRoot+'consumer/add.php', consumer, this.options);     	    
  }
  update(consumer:Consumer) {
    return this.http.put(this.apiRoot+'consumer/edit.php', consumer, this.options);     	    
  }
  delete(id:number){
     return this.http.delete(this.apiRoot+'consumer/delete.php?id='+id, this.options );  
  }
  constructor(private _http:Http,
    private authenticationService: AuthenticationService) { 
    this.http = _http;
    let headers = new Headers({'Content-Type': 'application/json'});  
    
    
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
   
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
  }
}
