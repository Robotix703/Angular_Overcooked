import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router"

import { AuthGuard } from './auth/auth.guard';

//Import des componsants
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { IngredientCreateComponent } from './ingredient/create/ingredient-create.component';
import { IngredientListComponent } from './ingredient/list/ingredient-list.component';
import { InstructionCreateComponent } from './instruction/create/instruction-create.component';
import { RecipeCreateComponent } from './recipe/create/recipe-create.component';
import { RecipeListComponent } from './recipe/list/recipe-list.component';
import { InstructionListComponent } from './instruction/list/instruction-list.component';
import { MealCreateComponent } from './meal/create/meal-create.component';
import { MealListComponent } from './meal/list/meal-list.component';

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
  {
    path:'instruction',
    children: [
      {
        path:'create/:recipeID', component: InstructionCreateComponent
      },
      {
        path:'list/:recipeID', component: InstructionListComponent
      }
    ]
  },
  {
    path:'recipe',
    children: [
      {
        path:'create', component: RecipeCreateComponent
      },
      {
        path:'list', component: RecipeListComponent
      }
    ]
  },
  {
    path:'meal',
    children: [
      {
        path:'create', component: MealCreateComponent
      },
      {
        path:'list', component: MealListComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {}
