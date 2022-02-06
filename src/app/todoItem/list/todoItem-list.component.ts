import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-todoItem-list',
    templateUrl: './todoItem-list.component.html',
    styleUrls: ['./todoItem-list.component.css']
})

export class TodoItemListComponent implements OnInit, OnDestroy {

    userIsAuthenticated = false;
    userId = null;

    private authStatusSub: Subscription = new Subscription();

    constructor(private authService: AuthService, public route: ActivatedRoute) { }

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
