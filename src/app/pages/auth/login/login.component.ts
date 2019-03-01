import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app/app.service';
import {Router} from '@angular/router';
import {AppConfig} from 'mysocialapp-ts-client/lib/models/app_config';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    config = new AppConfig({});
    email: string;
    password: string;
    remember = true;

    constructor(private app: AppService,
                private router: Router) {
        if (this.router.url === '/auth/logout') {
            app.disconnect();
            this.router.navigateByUrl('/auth/login');
        }
    }

    async ngOnInit() {
        this.config = await this.app.getClient().getConfig();
    }

    async login() {
        try {
            const session = await this.app.login(this.email, this.password, this.remember);
            const account = await session.account.get();
            this.router.navigate(['/newsfeed']);
        } catch (err) {
            console.log(err);
        }
    }
}
