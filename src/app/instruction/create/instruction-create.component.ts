import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-instruction-create',
    templateUrl: './instruction-create.component.html',
    styleUrls: ['./instruction-create.component.css']
})

export class InstructionCreateComponent implements OnInit {

    constructor(private fb: FormBuilder) { }

    productForm: FormGroup = new FormGroup({});

    ngOnInit() {
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
        console.log(this.productForm.value)
        if (this.productForm.invalid) {
            console.log("Invalid");
            return;
        }

        this.productForm.reset();
    }
}