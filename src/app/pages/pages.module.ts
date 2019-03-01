import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModule} from './auth/auth.module';
import {DashboardModule} from './dashboard/dashboard.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthModule,
        DashboardModule,
    ]
})
export class PagesModule {
}
