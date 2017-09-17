import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Product } from '../model/product';
import 'rxjs';
import * as AppConst from './../app.const'; 
@Injectable()
export class ProductService {
  http: Http;
  headers: Headers;
  options: RequestOptions;
  apiRoot:String=AppConst.API_ENDPOINT;
  getProducts() :Observable<Array<Product>>{
    return this.http.get(this.apiRoot+'product/get.php', this.options).map(x=>x.json());
  }
  getCompanyProducts(company:number) :Observable<Array<Product>>{
    return this.http.get(this.apiRoot+'product/get.php?company='+company, this.options).map(x=>x.json());
  }
  getSearch(search:string){
    return this.http.get(this.apiRoot+'product/get.php?search='+search, this.options).map(x=>x.json());
  }
  getProduct(id:number) :Observable<Product>{
    return this.http.get(this.apiRoot+'product/get.php?id='+id, this.options).map(x=>x.json());
  }
  add(product:Product) {
    return this.http.post(this.apiRoot+'product/add.php', product, this.options);     	    
  }
  active(id:number) {
    return this.http.post(this.apiRoot+'product/edit.php', {'id':id,'active':'1'}, this.options);     	    
  }
  deactive(id:number) {
    return this.http.post(this.apiRoot+'product/edit.php', {'id':id,'active':'0'}, this.options);     	    
  }
  update(product:Product) {
    return this.http.put(this.apiRoot+'product/edit.php', product, this.options);     	    
  }
  delete(id:number){
     return this.http.delete(this.apiRoot+'product/delete.php?id='+id, this.options );  
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
