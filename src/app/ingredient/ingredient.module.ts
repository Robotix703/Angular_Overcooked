import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { AngularMaterialModule } from '../angular-material.component';
import { ReactiveFormsModule } from '@angular/forms';

import { IngredientCreateComponent } from './create/ingredient-create.component';
import { IngredientListComponent } from './list/ingredient-list.component';

@NgModule({
    declarations: [
        IngredientListComponent,
        IngredientCreateComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule
    ]
})
export class IngredientModule {}
