import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator';
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
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageSize: number = 10;
  length: number = 0;
  currentPage: number = 0;
  searchName: string = "";

  constructor(
    public route: ActivatedRoute,
    public IngredientService: IngredientService) { }

  ngOnInit() {
    this.getIngredients(this.searchName, this.pageSize, this.currentPage);
  }

  onDelete(ingredient: Ingredient) {
    if (this.clickMethod(ingredient.name)) {
      this.IngredientService.deleteIngredient(ingredient._id)
      .subscribe(() => {
        this.getIngredients(this.searchName, this.pageSize, this.currentPage);
      });
    }
  }

  getIngredientsData(event?: PageEvent) {
    this.currentPage = event!.pageIndex;
    this.getIngredients(this.searchName, this.pageSize, this.currentPage);
  }

  search(event: any){
    this.searchName = event.target.value;
    this.getIngredients(this.searchName, this.pageSize, this.currentPage);
  }

  clickMethod(name: string) {
    return confirm("Confirmez la suppression de " + name);
  }

  getIngredients(searchName: string, pageSize: number, pageIndex: number){
    this.IngredientService.getIngredients(searchName, pageSize, pageIndex)
      .subscribe((fetchedData) => {
        this.ingredients = fetchedData.ingredients;
      });
  }
}
