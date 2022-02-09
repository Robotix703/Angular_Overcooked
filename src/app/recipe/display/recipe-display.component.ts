import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-display',
    templateUrl: './recipe-display.component.html',
    styleUrls: ['./recipe-display.component.css']
})

export class RecipeDisplayComponent implements OnInit, OnDestroy {

    userIsAuthenticated = false;
    userId = null;

    private authStatusSub: Subscription = new Subscription();

    constructor(private recipeService: RecipeService, private authService: AuthService, public route: ActivatedRoute) { }

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}
