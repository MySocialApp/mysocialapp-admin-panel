import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RootLayoutComponent} from '../root/root.component';
import {Account} from 'mysocialapp-ts-client/lib/models/account';
import {AppService} from '../../../services/app/app.service';
import {defaultAvatar} from '../../../services/default.service';
import {DomSanitizer} from '@angular/platform-browser';
import {pagesToggleService} from '../../services/toggler.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-simplywhite-layout',
    templateUrl: './simplywhite.component.html',
    styleUrls: ['./simplywhite.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SimplyWhiteLayoutComponent extends RootLayoutComponent implements OnInit {

    menuLinks = [
        {
            label: 'Users',
            routerLink: '/users',
            iconType: 'fa',
            iconName: 'line-chart',
            active: true
        },
        {
            label: 'Groups',
            routerLink: '/groups',
            iconType: 'fa',
            iconName: 'flask'
        },
    ];

    account: Account;
    selectedOption;
    options = [];

    constructor(public _DomSanitizationService: DomSanitizer,
                public toggler: pagesToggleService,
                public router: Router,
                public appService: AppService,
                public changeDetectorRef: ChangeDetectorRef) {
        super(toggler, router, appService, _DomSanitizationService, changeDetectorRef);
    }

    ngOnInit() {
        this.changeLayout('menu-pin');
        // Will sidebar close on screens below 1024
        this.autoHideMenuPin();
        this.setAccount();
    }

    async setAccount() {
        if (AppService.isLogged()) {
            this.account = await this.appService.getAccount();
        }
    }

    get avatar(): string {
        if (this.account && this.account.displayed_photo) {
            return this._DomSanitizationService.bypassSecurityTrustUrl(this.account.displayed_photo.small_url) as string;
        }
        return this._DomSanitizationService.bypassSecurityTrustUrl(defaultAvatar) as string;
    }
}
