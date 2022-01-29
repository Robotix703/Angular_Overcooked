import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

import { PantryService } from "../pantry.service";

@Component({
    selector: 'app-pantry-create',
    templateUrl: './pantry-create.component.html',
    styleUrls: ['./pantry-create.component.css']
})

export class PantryCreateComponent implements OnInit {

    userIsAuthenticated = false;
    userId = null;

    constructor(public PantryService: PantryService, public route: ActivatedRoute) { }

    ngOnInit() {

    }
}
