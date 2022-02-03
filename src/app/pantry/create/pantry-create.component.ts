import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { IngredientService } from 'src/app/ingredient/ingredient.service';
import { PantryService } from "../pantry.service";

@Component({
    selector: 'app-pantry-create',
    templateUrl: './pantry-create.component.html',
    styleUrls: ['./pantry-create.component.css']
})

export class PantryCreateComponent implements OnInit {

    formulaire: FormGroup = new FormGroup({});
    ingredientAutoComplete = new FormControl();
    
    options: string[] = [];
    filteredOptions: Observable<string[]> = new Observable;

    constructor(public PantryService: PantryService, public route: ActivatedRoute, public IngredientService: IngredientService) { }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("ingredientID")) {
                let ingredientID = paramMap.get('ingredientID') || "";

                this.IngredientService.getIngredientByID(ingredientID).subscribe((result) => {
                    this.formulaire.setValue({
                        quantity: null,
                        expirationDate: null
                    });
                    this.ingredientAutoComplete.setValue(result.name);
                });
            }

            if (paramMap.has("pantryID")) {
                let pantryID = paramMap.get('pantryID') || "";

                this.PantryService.getPantryByID(pantryID).subscribe((result) => {
                    this.formulaire.setValue({
                        quantity: result.quantity,
                        expirationDate: result.expirationDate
                    });
                    this.ingredientAutoComplete.setValue(result.ingredientName);
                });
            }
        });

        this.IngredientService.getAllIngredientsName().subscribe((result) => {
            this.options = result;

            this.filteredOptions = this.ingredientAutoComplete.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        })

        this.formulaire = new FormGroup({
            quantity: new FormControl(null, {
                validators: [Validators.required]
            }),
            expirationDate: new FormControl(new Date()),
            frozen : new FormControl(null, {
                validators: []
            })
        });
    }

    onSavePantry() {
        this.PantryService.createPantry(
            this.ingredientAutoComplete.value, 
            this.formulaire.value.quantity, 
            this.formulaire.value.expirationDate, 
            this.formulaire.value.frozen
        );
    }
}
