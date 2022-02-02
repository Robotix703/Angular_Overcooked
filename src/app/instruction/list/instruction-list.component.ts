import { ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { InstructionService } from '../instruction.service';

@Component({
    selector: 'app-instruction-list',
    templateUrl: './instruction-list.component.html',
    styleUrls: ['./instruction-list.component.css']
})

@Injectable({ providedIn: "root" })

export class InstructionListComponent implements OnInit, OnDestroy {

    instructions: any[] = [];
    totalInstructions: number = 0;
    recipeID: string = "";

    userIsAuthenticated = false;
    userId = null;

    private authStatusSub: Subscription = new Subscription;

    constructor(
        private authService: AuthService,
        public route: ActivatedRoute,
        public InstructionService: InstructionService) { }

    displayedColumns: string[] = ['name', 'quantity'];
    dataSource = [];

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("recipeID")) {
                this.recipeID = paramMap.get('recipeID') || "";
                this.getInstructions();
            }
        });

        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
    }

    onDelete(instructionID: string) {
        const instructionName = this.instructions.find(e => e._id == instructionID)!.text;
        if (this.clickMethod(instructionName)) {
            this.InstructionService.deleteInstruction(instructionID).subscribe(() => {
                this.getInstructions();
            });
        }
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }

    clickMethod(name: string) {
        return confirm("Confirmez la suppression de " + name);
    }

    getInstructions(){
        this.InstructionService.getInstructions(this.recipeID)
                .subscribe((instructionData: { Instructions: any }) => {
                    this.instructions = instructionData.Instructions;
                    this.totalInstructions = instructionData.Instructions.length;
                    for(let instruction of instructionData.Instructions){
                        this.dataSource = instruction.composition;
                    }
                });
    }
}
