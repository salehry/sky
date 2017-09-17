import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { User } from "../model/user";
import { Level } from "../model/level";
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs';
import { AuthenticationService } from "../login/authentication.service";
import * as AppConst from './../app.const'; 
@Injectable()
export class UsersService {
  http: Http;
  headers: Headers;
  options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  getUsers() :Observable<Array<User>>{
    return this.http.get(this.apiRoot+'user/get.php',this.options).map(x=>x.json());
  }
  getUser(id:number) :Observable<User>{
    return this.http.get(this.apiRoot+'user/get.php?id='+id,this.options).map(x=>x.json());
  }
  getSearch(search:string) :Observable<Array<User>>{
    return this.http.get(this.apiRoot+'user/get.php?search='+search,this.options).map(x=>x.json());
  }
  getUserLevels() :Observable<Array<Level>>{
    return this.http.get(this.apiRoot+'user/get_levels.php',this.options).map(x=>x.json());
  }
  getAdmins() :Observable<Array<User>>{
    return this.http.get(this.apiRoot+'user/get.php?group=admin',this.options).map(x=>x.json());
  }
  getAgents() :Observable<Array<User>>{
    return this.http.get(this.apiRoot+'user/get.php?group=agent',this.options).map(x=>x.json());
  }
  getConsumers() :Observable<Array<User>>{
    return this.http.get(this.apiRoot+'user/get.php?group=consumer',this.options).map(x=>x.json());
  }
  add(user:User) {
    return this.http.post(this.apiRoot+'user/add.php', user,this.options);     	    
  }
  update(user:User) {
    return this.http.put(this.apiRoot+'user/edit.php', user,this.options);     	    
  }
  delete(id:number){
     return this.http.delete(this.apiRoot+'user/delete.php?id='+id, this.options );  
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
