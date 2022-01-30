import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})

export class IngredientListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  ingredientLimit: Number = 100;
  totalIngredient: Number = 0;

  constructor(
    public route: ActivatedRoute,
    public IngredientService: IngredientService) { }

  ngOnInit() {
    this.getIngredients();
  }

  onDelete(ingredient: Ingredient) {
    if (this.clickMethod(ingredient.name)) {
      this.IngredientService.deleteIngredient(ingredient._id)
      .subscribe(() => {
        this.getIngredients();
      });
    }
  }

  updateLimit(limit: number){
    this.ingredientLimit = limit;
  }

  search(event: any){
    this.IngredientService.getIngredientsByName(event.target.value)
    .subscribe((fetchedData) => {
      this.ingredients = fetchedData.ingredients;
    });
  }

  clickMethod(name: string) {
    return confirm("Confirmez la suppression de " + name);
  }

  getIngredients(){
    this.IngredientService.getIngredients()
      .subscribe((fetchedData) => {
        this.ingredients = fetchedData.ingredients;
      });
  }
}
