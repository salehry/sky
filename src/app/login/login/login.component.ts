import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, NgModel, ValidationErrors,NgForm } from "@angular/forms";
import { AuthenticationService } from '../authentication.service';
//import {CookieService} from 'angular2-cookie/core';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    /*private _cookieService:CookieService*/) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
       
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                   //console.log( this._cookieService.get('currentUser'));
                    this.router.navigate(['/']);
                } else {
                    this.error = 'שם המשתמש או הסיסמה שגויים!!';
                   
                    this.loading = false;
                }
            });
    }
}
