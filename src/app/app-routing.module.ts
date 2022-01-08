import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router"

import { AuthGuard } from './auth/auth.guard';

//Import des componsants
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { IngredientCreateComponent } from './ingredient/create/ingredient-create.component';
import { IngredientListComponent } from './ingredient/list/ingredient-list.component';

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
  {
    path:'ingredient',
    children: [
      {
        path:'create', component: IngredientCreateComponent
      },
      {
        path:'list', component: IngredientListComponent
      }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {}
