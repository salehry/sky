import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Company } from "../model/company";
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs';
import * as AppConst from './../app.const'; 
@Injectable()
export class CompanyService {
  http: Http;
  headers: Headers;
  options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  getCompanys() :Observable<Array<Company>>{
    return this.http.get(this.apiRoot+'company/get.php', this.options).map(x=>x.json());
  }
  add(company:Company) {
    return this.http.post(this.apiRoot+'company/add.php', company, this.options);     	    
  }
  update(company:Company) {
    return this.http.put(this.apiRoot+'company/edit.php', company, this.options);     	    
  }
  delete(id:number){
     return this.http.delete(this.apiRoot+'company/delete.php?id='+id, this.options );  
  }
  constructor(private _http:Http) { 
    this.http = _http;
    let headers = new Headers({'Content-Type': 'application/json'});  
    let ls = localStorage.getItem('currentUser');
    let jls=JSON.parse(ls);
    let authToken=jls.token;
   
    headers.append('Authorization',`Bearer ${authToken}`)
    this.options = new RequestOptions({headers: headers});
  }
}
