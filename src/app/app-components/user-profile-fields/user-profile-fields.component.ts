import {Component, Input, OnInit} from '@angular/core';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {Gender} from 'mysocialapp-ts-client/lib/models/gender';
import {AppService} from '../../services/app/app.service';
import {Account} from 'mysocialapp-ts-client/lib/models/account';
import {MessageService} from '../../@pages/components/message/message.service';
import {NotificationMessageStyle} from '../../models/notification_message_style';

@Component({
    selector: 'app-user-profile-fields',
    templateUrl: './user-profile-fields.component.html',
    styleUrls: ['./user-profile-fields.component.scss']
})
export class UserProfileFieldsComponent implements OnInit {

    original_user: User;
    account = new Account();
    genders = [Gender.Male, Gender.Female];

    constructor(public appService: AppService,
                private messageService: MessageService) {
    }

    ngOnInit() {
    }

    @Input()
    set user(u: User) {
        this.original_user = u;
        const session = this.appService.getSession();
        session.getSessionAs(u.id).then(s => s.account.get(false).then(acc => {
            this.account = acc;
        }));
    }

    set date_of_birth(d: string) {
        this.account.date_of_birth = new Date(d).toISOString().replace(/[.][0-9]{3}/g, '');
    }

    get date_of_birth(): string {
        return this.account.date_of_birth;
    }

    isValid(): boolean {
        if (this.account.email == null || this.account.email.length === 0) {
            return false;
        }

        if (this.account.first_name == null || this.account.first_name.length === 0) {
            return false;
        }

        if (this.account.last_name == null || this.account.last_name.length === 0) {
            return false;
        }

        if (this.account.gender == null) {
            return false;
        }

        return true;
    }

    async save() {
        try {
            await this.account.update();
            this.messageService.success('Successfully saved', NotificationMessageStyle);
            this.refreshOriginalUser();
        } catch (e) {
            this.messageService.error(e.message, NotificationMessageStyle);
        }
    }

    private async refreshOriginalUser() {
        const u = await this.appService.getSession().user.get(this.original_user.id);
        this.user = u;
    }

    cancel() {
        this.user = this.original_user;
    }
}
