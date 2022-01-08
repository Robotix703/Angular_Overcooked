import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})

export class IngredientCreateComponent implements OnInit {

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    
  }
}
