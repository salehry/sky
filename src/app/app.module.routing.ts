import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./login/auth.guard";
import { EditUserComponent } from "./users/edit-user/edit-user.component";
import { LoginComponent } from "./login/login/login.component";
import { UsersComponent } from "./users/users/users.component";
import { EditConsumerComponent } from "./consumer/edit-consumer/edit-consumer.component";
import { AddConsumerComponent } from "./consumer/add-consumer/add-consumer.component";
import { ConsumerComponent } from "./consumer/consumer/consumer.component";
import { CompanyComponent } from "./company/company/company.component";
import { AddUserComponent } from "./users/add-user/add-user.component";
import { ProductComponent } from "./product/product/product.component";
const appRoutes: Routes = [ 
    { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
    { path: 'companies',      component: CompanyComponent , canActivate: [AuthGuard]},
    { path: 'products',      component: ProductComponent , canActivate: [AuthGuard]},
    { path: 'consumers',      component: ConsumerComponent , canActivate: [AuthGuard]},
    { path: 'add-consumer',      component: AddConsumerComponent , canActivate: [AuthGuard]},
    { path: 'edit-consumer/:id',      component: EditConsumerComponent , canActivate: [AuthGuard]},
    { path: '',      component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', canActivate: [AuthGuard] },
  ];
@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }