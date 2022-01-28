import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

import { Pantry } from "./pantry.model";

const URL_BACKEND = environment.apiURL + "pantry/";

@Injectable({ providedIn: 'root' })

export class PantryService {

    constructor(private http: HttpClient, private router: Router) { }
}