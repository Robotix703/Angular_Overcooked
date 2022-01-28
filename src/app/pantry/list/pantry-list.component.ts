import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Pantry } from '../pantry.model';
import { PantryService } from "../pantry.service";

@Component({
    selector: 'app-pantry-list',
    templateUrl: './pantry-list.component.html',
    styleUrls: ['./pantry-list.component.css']
})

export class PantryListComponent implements OnInit {

    userIsAuthenticated = false;
    userId = null;

    private authStatusSub: Subscription = new Subscription();

    constructor(private authService: AuthService, public PantryService: PantryService, public route: ActivatedRoute) { }

    ngOnInit() {
        
    }
}
