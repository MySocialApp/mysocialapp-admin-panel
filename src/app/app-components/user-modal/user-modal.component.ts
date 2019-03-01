import {Component, Input, OnInit} from '@angular/core';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {Account} from 'mysocialapp-ts-client/lib/models/account';
import {AppService} from '../../services/app/app.service';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

    @Input() user: User;
    public account: Account;
    public descriptionLengthLimit = 200;

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.getUser();
    }

    async getUser() {
        const session = await this.appService.getSession();
        const userSession = await session.getSessionAs(this.user.id);
        this.account = await userSession.account.get(false);
        this.user = this.account as User;
    }

    get profile_cover_photo(): string {
        return this.user.profile_cover_photo ? ('url(' + this.user.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.user.profile_photo ? this.user.profile_photo.medium_url : '';
    }

}
