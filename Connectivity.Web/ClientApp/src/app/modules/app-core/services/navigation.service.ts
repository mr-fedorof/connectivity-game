import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
    constructor(
        private readonly router: Router
    ) {
    }

    public goToHome(): void {
        this.router.navigate(['']);
    }

    public goToLobby(id: string): void {
        this.router.navigate([`/lobby/${id}`]);
    }

    public goToPlayerIdentification(id: string): void {
        this.router.navigate([`/lobby/${id}/player-identification`]);
    }
}
