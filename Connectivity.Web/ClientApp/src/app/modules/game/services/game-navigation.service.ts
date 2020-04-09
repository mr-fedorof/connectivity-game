import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GameNavigationService {
    constructor(
        private readonly router: Router,
    ) {
    }

    goToLobby(id: string): void {
        this.router.navigate([`/lobby/${id}`]);
    }
}
