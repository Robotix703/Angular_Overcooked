import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

import {  IngredientInventory } from "./pantry.model";

const URL_BACKEND = environment.apiURL + "pantry/";

@Injectable({ providedIn: 'root' })

export class PantryService {

    constructor(private http: HttpClient, private router: Router) { }

    getIngredientInventory(){
        return this.http.get<IngredientInventory[]>(URL_BACKEND + "fullPantryInventory");
    }

    deletePantry(pantryID: string){
        return this.http.delete(URL_BACKEND + pantryID);
    }
}