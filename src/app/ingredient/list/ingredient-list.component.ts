import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})

export class IngredientListComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onDelete() {
   
  }

  ngOnDestroy() {

  }
}
