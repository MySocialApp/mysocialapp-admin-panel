import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Account} from 'mysocialapp-ts-client/lib/models/account';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {UserStatFollow, UserStatFriend} from 'mysocialapp-ts-client/lib/models/user_stat';
import {FeedPost} from 'mysocialapp-ts-client/lib/models/feed_post';
import {MessageService} from '../../@pages/components/message/message.service';
import {AppService} from '../../services/app/app.service';
import {NotificationMessageStyle} from '../../models/notification_message_style';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    public now = new Date();
    private _user: User = new User({user_stat: {status: {state: '', last_connection_date: ''}}});
    public account: Account = new Account({user_stat: {friend: {total: 0}, follow: {total_followers: 0, total_following: 0}}});
    public currentFeedPage = 0;
    public feedItems: Feed[] = [];
    public _selectedFeed: Feed;

    @Output()
    onSelectedFeed = new EventEmitter<Feed>();

    wallHeight = 0;

    constructor(private route: ActivatedRoute,
                private appService: AppService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            if (params.id == null) {
                return;
            }

            this.getUser(params.id).then(async () => {
                await this.getUserFeed();
            });
        });
    }

    @Input()
    set user(u: User) {
        this._user = u;
        const session = this.appService.getSession();
        session.getSessionAs(u.id).then(s => s.account.get(false).then(acc => {
            this.account = acc;
            this.account.user_stat.friend = new UserStatFriend({total: 0});
            this.account.user_stat.follow = new UserStatFollow();
            this.account.user_stat.follow.total_followers = 0;
            this.account.user_stat.follow.total_following = 0;

            this.account.userStat().then(us => this.account.user_stat = us);
        }));

        this.getUserFeed();
    }

    get user(): User {
        return this._user;
    }

    set selectedFeed(f: Feed) {
        this._selectedFeed = f;
        this.onSelectedFeed.emit(this._selectedFeed);
    }

    get selectedFeed(): Feed {
        return this._selectedFeed;
    }

    async getUser(userId: string): Promise<void> {
        const session = await this.appService.getSession();
        this.user = await session.user.get(userId);
    }

    async getUserFeed() {
        if (!this.user) {
            return;
        }

        this.currentFeedPage = 0;
        this.feedItems = await this.user.listNewsFeed(this.currentFeedPage, 10);
    }

    getLastConnectionDate(): string {
        if (this.user == null || this.user.user_stat == null || this.user.user_stat.status == null ||
            this.user.user_stat.status.last_connection_date == null) {
            return null;
        }

        return this.user.user_stat.status.last_connection_date;
    }

    getState(): string {
        if (this.user == null || this.user.user_stat == null || this.user.user_stat.status == null ||
            this.user.user_stat.status.state == null) {
            return null;
        }

        return this.user.user_stat.status.state.toString();
    }

    resetPassword() {
        if (this.account.email == null) {
            return;
        }

        this.appService.getClient().resetPassword(this.account.email);
    }

    async onWallScrollDown() {
        this.currentFeedPage++;
        const r = await this.user.listNewsFeed(this.currentFeedPage, 10);
        r.forEach(f => this.feedItems.push(f));
    }

    async sendPost(post: FeedPost) {
        try {
            const feed = await this.user.createFeedPost(post);
            console.log(feed);
            this.feedItems.unshift(feed);
        } catch (e) {
            this.messageService.error(e.message, NotificationMessageStyle);
        }
    }

    async onSwitchAccountState(isEnabled: boolean) {
        try {
            if (isEnabled) {
                // enable account
                const x = await this.user.enable();
                this.messageService.success('Account successfully enabled', NotificationMessageStyle);
                this.user = x;
                return;
            }

            // disable account
            const u = await this.user.disable();
            this.messageService.warning('Account successfully disabled', NotificationMessageStyle);
            this.user = u;
        } catch (e) {
            this.messageService.error(e.message, NotificationMessageStyle);
        }
    }
}
