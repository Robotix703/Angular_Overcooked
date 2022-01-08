import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})

export class IngredientListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  ingredientLimit: Number = 100;
  totalIngredient: Number = 0;

  private ingredientsSub: Subscription = new Subscription;

  constructor(
    private authService: AuthService, 
    public route: ActivatedRoute,
    public IngredientService: IngredientService) { }

  ngOnInit() {
    this.IngredientService.getIngredients()
      .subscribe((fetchedData) => {
        this.ingredients = fetchedData.ingredients;
      });
  }

  onDelete(ingredient: Ingredient) {
    this.IngredientService.deleteIngredient(ingredient._id)
    .subscribe(() => {
      this.IngredientService.getIngredients()
      .subscribe((fetchedData) => {
        this.ingredients = fetchedData.ingredients;
      });
    });
  }

  ngOnDestroy() {

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
}
