import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

import { Instruction } from './instruction.model';

const URL_BACKEND = environment.apiURL + "instruction/";

@Injectable({ providedIn: 'root' })

export class InstructionService {

    constructor(private http: HttpClient, private router: Router) { }
}