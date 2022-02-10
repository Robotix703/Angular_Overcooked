import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { PrettyRecipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-display',
    templateUrl: './recipe-display.component.html',
    styleUrls: ['./recipe-display.component.css']
})

export class RecipeDisplayComponent implements OnInit, OnDestroy {

    userIsAuthenticated = false;
    userId = null;

    prettyRecipeData: PrettyRecipe = {
        _id: "",
        title: "",
        numberOfLunch: 0,
        category: "",
        duration: 0,
        score: 0,
        instructions: []
    };

    displayedColumns: string[] = ['name', 'quantity'];
    dataSource: any = [];

    private authStatusSub: Subscription = new Subscription();

    constructor(private recipeService: RecipeService, private authService: AuthService, public route: ActivatedRoute) { }

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("recipeID")) {
                let recipeID = paramMap.get('recipeID') || "";

                this.recipeService.getPrettyRecipe(recipeID)
                .subscribe((result) => {
                    this.prettyRecipeData = result;

                    for(let instruction of this.prettyRecipeData.instructions){
                        this.dataSource = instruction.composition;
                    }
                });
            }

            if (paramMap.has("mealID")) {
                let mealID = paramMap.get('mealID') || "";

                this.recipeService.getPrettyRecipe("", mealID)
                .subscribe((result) => {
                    this.prettyRecipeData = result;

                    for(let instruction of this.prettyRecipeData.instructions){
                        this.dataSource = instruction.composition;
                    }
                });
            }
        });
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}
