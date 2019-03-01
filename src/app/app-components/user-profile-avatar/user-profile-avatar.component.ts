import {Component, Input, OnInit} from '@angular/core';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {defaultAvatar} from '../../services/default.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-profile-avatar',
    templateUrl: './user-profile-avatar.component.html',
    styleUrls: ['./user-profile-avatar.component.scss']
})
export class UserProfileAvatarComponent implements OnInit {

    @Input()
    user: User;

    @Input()
    size = 'd39';

    constructor(private _DomSanitizationService: DomSanitizer,
                private router: Router) {
    }

    ngOnInit() {
    }

    getUserAvatar(): any {
        return this.user && this.user.displayed_photo ?
            (this._DomSanitizationService.bypassSecurityTrustUrl(this.user.displayed_photo.medium_url)) : defaultAvatar;
    }

    getConnectionColor(): string {
        if (this.user == null) {
            return 'border-invisible';
        }

        // @ts-ignore
        if (this.user.account_enabled === false) {
            return 'border-account-disabled';
        }

        if (this.user.user_stat == null || this.user.user_stat.status == null || this.user.user_stat.status.state.toString() == null) {
            return 'border-invisible';
        }

        switch (this.user.user_stat.status.state.toString()) {
            case 'CONNECTED':
                return 'border-connected';
            case 'AWAY':
                return 'border-away';
            case 'NOT_CONNECTED':
                return 'border-disconnected';
            default:
                return 'border-invisible';
        }
    }

    visitProfile() {
        this.router.navigate(['user', this.user.id]);
    }
}
