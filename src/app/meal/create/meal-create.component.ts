import { Component, OnDestroy, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { categoriesRecipe, Recipe } from 'src/app/recipe/recipe.model';
import { RecipeService } from 'src/app/recipe/recipe.service';

import { MealService } from "../meal.service";

@Component({
    selector: 'app-meal-create',
    templateUrl: './meal-create.component.html',
    styleUrls: ['./meal-create.component.css']
})

export class MealCreateComponent implements OnInit, OnDestroy {

    isLoading = false;
    recipes: Recipe[] = [];

    userIsAuthenticated = false;
    userId = null;

    pageSizeOptions: number[] = [10, 25, 50, 100];
    pageSize: number = 10;
    length: number = 0;
    currentPage: number = 0;
    searchName: string = "";
    selectedCategory: string = "";

    categoriesRecipe = categoriesRecipe;

    private authStatusSub: Subscription = new Subscription();

    constructor(private recipeService: RecipeService, private authService: AuthService, public MealService: MealService, public route: ActivatedRoute) { }

    ngOnInit() {
        this.recipeService.getFilteredRecipe("", "", this.pageSize, this.currentPage).subscribe((data: { recipes: Recipe[], count: number }) => {
            this.displayRecipes(data.recipes, data.count);
        });

        this.userIsAuthenticated = this.authService.getIsAuth();

        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
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

    getRecipesData(event?: PageEvent) {
        this.recipeService.getFilteredRecipe("", "", event!.pageSize, event!.pageIndex).subscribe((data) => {
            this.displayRecipes(data.recipes, data.count);
        });
        this.currentPage = event!.pageIndex;
    }

    addMeal(recipeID: string, numberOfLunch: number) {
        this.MealService.createMeal(recipeID, numberOfLunch);
    }

    getRecipes(category: string, name: string, pageSize: number, currentPage: number) {
        this.recipeService.getFilteredRecipe(category, name, pageSize, currentPage).subscribe((data: { recipes: Recipe[], count: number }) => {
            this.displayRecipes(data.recipes, data.count);
        });
    }

    search(event: any) {
        this.searchName = event.target.value;
        this.getRecipes(this.selectedCategory, event.target.value, this.pageSize, this.currentPage);
    }

    selectCategory(category: any) {
        this.selectedCategory = category;
        this.getRecipes(this.selectedCategory, this.searchName, this.pageSize, this.currentPage);
    }
}
