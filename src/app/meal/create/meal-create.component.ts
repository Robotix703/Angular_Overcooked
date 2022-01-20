import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MealService } from "../meal.service";

@Component({
    selector: 'app-meal-create',
    templateUrl: './meal-create.component.html',
    styleUrls: ['./meal-create.component.css']
})

export class MealCreateComponent implements OnInit {

    constructor(public MealService: MealService, public route: ActivatedRoute) { }

    ngOnInit() {
        
    }
}
