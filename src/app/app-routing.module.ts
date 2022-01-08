import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router"

import { AuthGuard } from './auth/auth.guard';

//Import des componsants
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path:'auth',
    children: [
      {
        path:'login', component: LoginComponent
      },
      {
        path:'signup', component: SignupComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {}
