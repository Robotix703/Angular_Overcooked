import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model'

import { environment } from "../../environments/environment";

const URL_BACKEND = environment.apiURL + "ingredient/";

@Injectable({ providedIn: 'root' })

export class IngredientService {

}