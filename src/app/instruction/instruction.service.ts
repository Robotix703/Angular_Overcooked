import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

import { Instruction } from './instruction.model';

const URL_BACKEND = environment.apiURL + "instruction/";

@Injectable({ providedIn: 'root' })

export class InstructionService {

    constructor(private http: HttpClient, private router: Router) { }

    addInstruction(text: string, ingredients: {ingredientName: string, quantity: number}[], recipeID: string, order: number, cookingTime: number = 0) {
        let instructionData : any = {
            text: text,
            ingredients: ingredients,
            recipeID: recipeID,
            order: order
        }
        if(cookingTime != 0) instructionData.cookingTime = cookingTime;

        this.http.post<Instruction>(URL_BACKEND + "/byIngredientName", instructionData)
            .subscribe((responseData: Instruction) => {
                this.router.navigate(["/instruction/list/" + recipeID]);
            });
    }

    getInstructions(recipeID: string){
        return this.http.get<{ Instructions: any }>(URL_BACKEND + `byRecipeID?recipeID=${recipeID}`);
    }

    deleteInstruction(instructionID: string){
        return this.http.delete(URL_BACKEND + instructionID);
    }

    getInstructionCount(recipeID: string){
        return this.http.get<number>(URL_BACKEND + `countForRecipe?recipeID=${recipeID}`);
    }
}