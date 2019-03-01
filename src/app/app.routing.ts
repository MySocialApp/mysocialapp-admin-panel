import {RouterModule, Routes} from '@angular/router';
import {AnonymousUserGuard} from './guards/anonymous-user-guard.module';
import {ConnectedUserGuardModule} from './guards/connected-user-guard.module';
import {AuthRouting} from './pages/auth/auth.routing';
import {NgModule} from '@angular/core';
import {BlankComponent} from './@pages/layouts';
import {dashboardRoutes} from './pages/dashboard/dashboard.routing';
import {CasualLayout} from './@pages/layouts/casual/casual.component';

export const AppRoutes: Routes = [
    {path: '', redirectTo: 'newsfeed', pathMatch: 'full'},
    {
        component: BlankComponent,
        data: {
            title: 'Authentication'
        },
        path: 'auth',
        children: [
            ...AuthRouting
        ],
        canActivate: [AnonymousUserGuard],
    },
    {
        component: CasualLayout,
        path: '',
        children: [
            ...dashboardRoutes
        ],
        canActivate: [ConnectedUserGuardModule],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule],
    providers: [AnonymousUserGuard, ConnectedUserGuardModule]
})
export class AppRoutingModule {
}
