import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

import { Pantry, IngredientInventory } from '../pantry.model';
import { PantryService } from "../pantry.service";

@Component({
    selector: 'app-pantry-list',
    templateUrl: './pantry-list.component.html',
    styleUrls: ['./pantry-list.component.css']
})

export class PantryListComponent implements OnInit {

    userIsAuthenticated = false;
    userId = null;

    inventory : IngredientInventory[] = [{ingredientID: "", ingredientName: "", ingredientImagePath: "", pantries: []}];

    constructor(public PantryService: PantryService, public route: ActivatedRoute) { }

    ngOnInit() {
        this.getIngredientInventory();
    }

    deletePantry(pantry: Pantry){
        this.PantryService.deletePantry(pantry._id).subscribe((result) => {
            this.getIngredientInventory();
        });
    }

    getIngredientInventory(){
        this.PantryService.getIngredientInventory().subscribe((inventory : IngredientInventory[]) => {
            this.inventory = inventory;
        });
    }
}
