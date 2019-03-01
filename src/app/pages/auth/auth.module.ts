import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRouting} from './auth.routing';

import {SharedModule} from '../../@pages/components/shared.module';
import {LoginComponent} from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(AuthRouting),
    ],
    declarations: [LoginComponent]
})
export class AuthModule {
}
