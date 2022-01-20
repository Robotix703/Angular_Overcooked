import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InstructionService } from '../instruction.service';

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
        ) { }

    productForm: FormGroup = new FormGroup({});

    recipeID: string = "";

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("recipeID")) {
                this.recipeID = paramMap.get('recipeID') || "";
            }
        });

        this.productForm = this.fb.group({
            text: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            ingredients: this.fb.array(
                [this.fb.group(
                    {
                        ingredientName: new FormControl(null, {
                            validators: [Validators.required, Validators.minLength(3)]
                        }),
                        quantity: new FormControl(null, {
                            validators: [Validators.required, Validators.min(0), Validators.max(9999)]
                        })
                    }
                )]
            )
        })
    }

    get ingredients() {
        return this.productForm.get('ingredients') as FormArray;
    }

    addIngredient() {
        this.ingredients.push(this.fb.group(
            {
                ingredientName: new FormControl(null, {
                    validators: [Validators.required, Validators.minLength(3)]
                }),
                quantity: new FormControl(null, {
                    validators: [Validators.required, Validators.min(0), Validators.max(9999)]
                })
            }
        ));
    }

    deleteIngredient(index: number) {
        this.ingredients.removeAt(index);
    }

    onSavePost() {
        if (this.productForm.invalid) return;

        this.InstructionService.addInstruction(this.productForm.value.text, this.productForm.value.ingredients, this.recipeID);
        this.productForm.reset();
    }
}