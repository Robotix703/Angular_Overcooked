import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IngredientService } from 'src/app/ingredient/ingredient.service';

import { PantryService } from "../pantry.service";

@Component({
    selector: 'app-pantry-create',
    templateUrl: './pantry-create.component.html',
    styleUrls: ['./pantry-create.component.css']
})

export class PantryCreateComponent implements OnInit {

    formulaire: FormGroup = new FormGroup({});

    constructor(public PantryService: PantryService, public route: ActivatedRoute, public IngredientService: IngredientService) { }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("ingredientID")) {
                let ingredientID = paramMap.get('ingredientID') || "";

                this.IngredientService.getIngredientByID(ingredientID).subscribe((result) => {
                    this.formulaire.setValue({
                        ingredientName: result.name,
                        quantity: null,
                        expirationDate: null
                      })
                });
            }

            if (paramMap.has("pantryID")) {
                let pantryID = paramMap.get('pantryID') || "";

                this.PantryService.getPantryByID(pantryID).subscribe((result) => {
                    this.formulaire.setValue({
                        ingredientName: result.ingredientName,
                        quantity: result.quantity,
                        expirationDate: result.expirationDate
                      })
                });
            }
        });
        
        this.formulaire = new FormGroup({
            ingredientName: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            quantity: new FormControl(null, {
                validators: [Validators.required]
            }),
            expirationDate: new FormControl(new Date())
        });
    }

    onSavePantry(){
        this.PantryService.createPantry(this.formulaire.value.ingredientName, this.formulaire.value.quantity, this.formulaire.value.expirationDate);
    }
}
