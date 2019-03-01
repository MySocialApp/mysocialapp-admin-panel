import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

export const AuthRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'logout',
                component: LoginComponent
            },
        ]
    }
];
