import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AppService} from '../services/app/app.service';

@Injectable()
export class ConnectedUserGuardModule implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate() {
        const isConnected = AppService.isLogged();

        if (!isConnected) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        return isConnected;
    }
}
