import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { categories, unitOfMeasures } from "../ingredient.model";

import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})

export class IngredientCreateComponent implements OnInit {

  formulaire: FormGroup = new FormGroup({});
  imagePreview: string = "";

  ingredientCategories = categories;
  ingredientUnitOfMeasures = unitOfMeasures;

  constructor(public IngredientService: IngredientService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.formulaire = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      consumable: new FormControl(null, {
        validators: []
      }),
      category: new FormControl(null, {
        validators: [Validators.required]
      }),
      unitOfMeasure: new FormControl(null, {
        validators: [Validators.required]
      }),
      shelfLife: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();

    this.formulaire.patchValue({image: file});
    this.formulaire.get('image')!.updateValueAndValidity();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSavePost(){
    if(this.formulaire.invalid) return;

    this.IngredientService.addIngredient(
      this.formulaire.value.name, 
      this.formulaire.value.consumable ? this.formulaire.value.consumable : false, 
      this.formulaire.value.image,
      this.formulaire.value.category,
      this.formulaire.value.unitOfMeasure,
      this.formulaire.value.shelfLife
    );

    this.formulaire.reset();
  }
}
