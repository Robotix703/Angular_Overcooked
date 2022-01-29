import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PantryService } from "../pantry.service";

@Component({
    selector: 'app-pantry-create',
    templateUrl: './pantry-create.component.html',
    styleUrls: ['./pantry-create.component.css']
})

export class PantryCreateComponent implements OnInit {

    formulaire: FormGroup = new FormGroup({});

    constructor(public PantryService: PantryService, public route: ActivatedRoute) { }

    ngOnInit() {
        this.formulaire = new FormGroup({
            ingredientName: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            quantity: new FormControl(null, {
                validators: [Validators.required]
            }),
            expirationDate: new FormControl(new Date())
        });
    }

    onSavePantry(){
        this.PantryService.createPantry(this.formulaire.value.ingredientName, this.formulaire.value.quantity, this.formulaire.value.expirationDate);
    }
}
