import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

import { Recipe } from './recipe.model';

const URL_BACKEND = environment.apiURL + "recipe/";

@Injectable({ providedIn: 'root' })

export class RecipeService {

    constructor(private http: HttpClient, private router: Router) { }

    addRecipe(title: string, numberOfLunch: number, image: File){
        const recipeData = new FormData();
        recipeData.append("title", title);
        recipeData.append("numberOfLunch", numberOfLunch.toString());
        recipeData.append("image", image, title);

        this.http.post<Recipe>(URL_BACKEND, recipeData)
            .subscribe((responseData: Recipe) => {
                this.router.navigate(["/"]);
            });
    }
}