import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

import { Meal } from "./meal.model";

const URL_BACKEND = environment.apiURL + "meal/";

@Injectable({ providedIn: 'root' })

export class MealService {

    constructor(private http: HttpClient, private router: Router) { }

    createMeal(recipeID: string, numberOfLunchPlanned: number) {
        this.http.post<Meal>(URL_BACKEND, { recipeID: recipeID, numberOfLunchPlanned: numberOfLunchPlanned.toString() })
            .subscribe((responseData: Meal) => {
                this.router.navigate(["/"]);
            });
    }
}