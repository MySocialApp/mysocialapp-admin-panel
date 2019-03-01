import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RootLayoutComponent} from '..';
import {Account} from 'mysocialapp-ts-client/lib/models/account';
import {AppConfig} from 'mysocialapp-ts-client/lib/models/app_config';
import {defaultAvatar} from '../../../services/default.service';

declare var pg: any;

@Component({
    selector: 'casual-layout',
    templateUrl: './casual.component.html',
    styleUrls: ['./casual.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CasualLayout extends RootLayoutComponent implements OnInit {
    menuItems = [
        {
            label: 'Dashboard',
            // @ts-ignore
            routerLink: '/dashboard',
            iconType: 'fa',
            iconName: 'line-chart'
        },
        {
            label: 'Newsfeed',
            // @ts-ignore
            routerLink: '/newsfeed',
            iconType: 'fa',
            iconName: 'line-chart'
        },
        {
            label: 'Users',
            routerLink: '/users',
            iconType: 'fa',
            iconName: 'flask'
        },
        {
            label: 'Groups',
            routerLink: '/groups',
            iconType: 'fa',
            iconName: 'flask'
        },
        {
            label: 'Events',
            routerLink: '/events',
            iconType: 'fa',
            iconName: 'flask'
        }
    ];

    account = new Account({});
    appConfig = new AppConfig({});

    ngOnInit() {
        pg.isHorizontalLayout = true;
        this.changeLayout('horizontal-menu');
        this.changeLayout('horizontal-app-menu');
        this.loadData();
    }

    loadData() {
        this.appService.getAccount().then(account => this.account = account);

        this.appService.getConfig().then(conf => {
            this.appConfig = conf;
            // TODO
        });
    }

    getAccountAvatar(): any {
        return this.account && this.account.displayed_photo ?
            (this._DomSanitizationService.bypassSecurityTrustUrl(this.account.displayed_photo.high_url)) : defaultAvatar;
    }

    logout() {
        this.appService.disconnect();
        this.router.navigate(['auth', 'login']);
    }

}

