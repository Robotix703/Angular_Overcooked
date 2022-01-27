import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

import { Ingredient } from './ingredient.model';

const URL_BACKEND = environment.apiURL + "ingredient/";

@Injectable({ providedIn: 'root' })

export class IngredientService {

    public ingredientLimit = -1;

    constructor(private http: HttpClient, private router: Router) { }

    addIngredient(name: string, consumable: boolean, image: File) {
        const ingredientData = new FormData();
        ingredientData.append("name", name);
        ingredientData.append("consumable", consumable.toString());
        ingredientData.append("image", image, name);

        this.http.post<Ingredient>(URL_BACKEND, ingredientData)
            .subscribe((responseData: Ingredient) => {
                this.router.navigate(["/ingredient/list"]);
            });
    }

    getIngredients(ingredientLimit: number = this.ingredientLimit) {
        return this.http.get<{ ingredients: Ingredient[], count: number }>(URL_BACKEND + '?limit=' + ingredientLimit);
    }

    getIngredientsByName(name: string) {
        return this.http.get<{ ingredients: Ingredient[], count: number }>(URL_BACKEND + `name?name=${name}`);
    }

    deleteIngredient(ingredientID: string) {
        return this.http.delete(URL_BACKEND + ingredientID);
    }
}