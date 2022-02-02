import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { InstructionService } from '../instruction.service';
import { IngredientService } from 'src/app/ingredient/ingredient.service';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-instruction-create',
    templateUrl: './instruction-create.component.html',
    styleUrls: ['./instruction-create.component.css']
})

export class InstructionCreateComponent implements OnInit {

    constructor(
        private fb: FormBuilder, 
        public InstructionService: InstructionService,
        public route: ActivatedRoute,
        public IngredientService: IngredientService
    ) { }

    productForm: FormGroup = new FormGroup({});
    ingredientAutoComplete = new FormControl();
    
    options: string[] = [];
    filteredOptions: Observable<string[]> = new Observable;

    recipeID: string = "";
    ingredients: {ingredientName: string, quantity: number}[] = [];

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("recipeID")) {
                this.recipeID = paramMap.get('recipeID') || "";

                if(this.recipeID){
                    this.InstructionService.getInstructionCount(this.recipeID).subscribe((count) => {
                        this.productForm.setValue({
                            text: null,
                            quantity: null,
                            cookingTime: null,
                            order: count + 1
                        })
                    });
                }
            }
        });

        this.productForm = this.fb.group({
            text: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            quantity: new FormControl(null, {
                validators: []
            }),
            cookingTime : new FormControl(null, {
                validators: []
            }),
            order: new FormControl(null, {
                validators: [Validators.required]
            })
        })

        this.IngredientService.getAllIngredientsName().subscribe((result) => {
            this.options = result;

            this.filteredOptions = this.ingredientAutoComplete.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        })
    }

    addIngredient() {
        if(this.ingredientAutoComplete.value && this.productForm.value.quantity){
            this.ingredients.push({
                ingredientName: this.ingredientAutoComplete.value,
                quantity: this.productForm.value.quantity
            });
            this.productForm.setValue({
                text: this.productForm.value.text,
                quantity: null,
                cookingTime: this.productForm.value.cookingTime,
                order: this.productForm.value.order
            });
            this.ingredientAutoComplete.setValue("");
        }
    }

    deleteIngredient(ingredientName: string) {
        this.ingredients = this.ingredients.filter(e => e.ingredientName != ingredientName);
    }

    onSavePost() {
        if (this.productForm.invalid) return;

        this.InstructionService.addInstruction(
            this.productForm.value.text, 
            this.ingredients, 
            this.recipeID, 
            this.productForm.value.order,
            this.productForm.value.cookingTime);
        this.productForm.reset();
    }
}