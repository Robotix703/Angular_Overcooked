import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

import { Recipe } from './recipe.model';

const URL_BACKEND = environment.apiURL + "recipe/";

@Injectable({ providedIn: 'root' })

export class RecipeService {

    constructor(private http: HttpClient, private router: Router) { }

    addRecipe(title: string, numberOfLunch: number, image: File, category: string, duration: number, score: number = 0){
        const recipeData = new FormData();
        recipeData.append("title", title);
        recipeData.append("numberOfLunch", numberOfLunch.toString());
        recipeData.append("image", image, title);
        recipeData.append("category", category);
        recipeData.append("duration", duration.toString());
        if(score != 0) recipeData.append("score", score.toString());

        this.http.post<Recipe>(URL_BACKEND, recipeData)
            .subscribe((responseData: Recipe) => {
                this.router.navigate(["/recipe/list"]);
            });
    }

    getRecipes(pageSize: number, currentPage: number){
        const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
        return this.http.get<{ recipes: any, count: number }>(URL_BACKEND + queryParams);
    }

    deleteRecipe(recipeID: string){
        return this.http.delete(URL_BACKEND + recipeID);
    }

    getRecipe(recipeID: string){
        return this.http.get<Recipe>(URL_BACKEND + "/byID?recipeID=" + recipeID);
    }
}