import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class GameNavigationService {
    constructor(
        private readonly router: Router
    ) {
    }

    public goToLobby(id: string): void {
        this.router.navigate([`/lobby/${id}`]);
    }
}
