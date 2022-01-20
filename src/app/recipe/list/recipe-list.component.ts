import { Component, OnDestroy, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {

  isLoading = false;
  recipes: Recipe[] = [];

  userIsAuthenticated = false;
  userId = null;

  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageSize: number = 10;
  length: number = 0;
  currentPage: number = 0;

  private authStatusSub: Subscription = new Subscription();

  constructor(private recipeService: RecipeService, private authService: AuthService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.getRecipes(this.pageSize, this.currentPage).subscribe((data: { recipes: Recipe[], count: number }) => {
      this.displayRecipes(data.recipes, data.count);
    });

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onDelete(recipeID: string) {
    const recipeName = this.recipes.find(e => e._id == recipeID)!.title;
    if (this.clickMethod(recipeName)) {
      this.recipeService.deleteRecipe(recipeID).subscribe(() => {
        this.recipeService.getRecipes(this.pageSize, this.currentPage).subscribe((data: { recipes: Recipe[], count: number }) => {
          this.displayRecipes(data.recipes, data.count);
        });
      });
    }
  }

  displayRecipes(recipes: Recipe[], count: number) {
    this.recipes = (recipes) ? recipes : [];
    this.length = count;
    this.isLoading = false;
    this.currentPage = 0;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  clickMethod(name: string) {
    return confirm("Confirmez la suppression de " + name);
  }

  getRecipesData(event?: PageEvent) {
    this.recipeService.getRecipes(event!.pageSize, event!.pageIndex).subscribe((data) => {
      this.displayRecipes(data.recipes, data.count);
    });
    this.currentPage = event!.pageIndex;
  }
}
