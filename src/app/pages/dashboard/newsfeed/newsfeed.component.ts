import {Component, HostListener, OnInit} from '@angular/core';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';
import {AppService} from '../../../services/app/app.service';
import {MessageService} from '../../../@pages/components/message/message.service';
import {FeedPost} from 'mysocialapp-ts-client/lib/models/feed_post';
import {NotificationMessageStyle} from '../../../models/notification_message_style';

@Component({
    selector: 'app-newsfeed',
    templateUrl: './newsfeed.component.html',
    styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

    public _selectedFeed: Feed;
    public currentFeedPage = 0;
    public feedItems: Feed[] = [];

    height = 0;

    constructor(private appService: AppService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.getNewsFeed();
    }

    set selectedFeed(f: Feed) {
        this._selectedFeed = f;
    }

    get selectedFeed(): Feed {
        return this._selectedFeed;
    }

    async getNewsFeed() {
        this.currentFeedPage = 0;
        this.feedItems = await this.appService.getSession().newsFeed.list(this.currentFeedPage, 10);
    }

    async onWallScrollDown() {
        this.currentFeedPage++;
        const r = await this.appService.getSession().newsFeed.list(this.currentFeedPage, 10);
        r.forEach(f => this.feedItems.push(f));
    }

    async sendPost(post: FeedPost) {
        try {
            const feed = await this.appService.getSession().newsFeed.create(post);
            console.log(feed);
            this.feedItems.unshift(feed);
        } catch (e) {
            this.messageService.error(e.message, NotificationMessageStyle);
        }
    }

}
