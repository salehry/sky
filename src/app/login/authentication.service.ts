import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
//import {CookieService} from 'angular2-cookie/core';
import * as AppConst from './../app.const'; 
import { LocalStorageService } from "../local-storage.service";
@Injectable()
export class AuthenticationService {
   public token: string;
    apiRoot:String=AppConst.API_ENDPOINT;
    constructor(private http: Http,private lsService:LocalStorageService) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/json'});  
        headers.append('Authorization','Bearer ')
        let options = new RequestOptions({headers: headers});
        return this.http.post(
            this.apiRoot+'authenticate.php', 
            JSON.stringify({ username: username, password: password ,login:'login'}),
            options)
            .map((response: Response) => {
                let _body=JSON.parse(response['_body']);
                let token = _body && _body.token;
                if (token) {
                    this.token = token;
                    this.lsService.setStorage('currentUser', JSON.stringify({ username: username, token: token }),60*60);
                    return true;
                } else {
                    return false;
                }
            });
    }
    logout(): void {
        this.token = null;
        this.lsService.removeStorage('currentUser');
    }
}