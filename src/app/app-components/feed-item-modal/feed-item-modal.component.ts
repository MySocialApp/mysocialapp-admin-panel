import {Component, Input, OnInit} from '@angular/core';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';
import {UserModalComponent} from '../user-modal/user-modal.component';

@Component({
    selector: 'app-feed-item-modal',
    templateUrl: './feed-item-modal.component.html',
    styleUrls: ['./feed-item-modal.component.scss'],
    entryComponents: [UserModalComponent]
})
export class FeedItemModalComponent implements OnInit {

    @Input() public feed: Feed;
    public allCommentLoaded = false;

    constructor() {
    }

    ngOnInit() {
    }

    get displayMoreComment() {
        return this.feed.object.comments.total > 0 && this.feed.object.comments.total > this.feed.object.comments.samples.length;
    }

    async getAllComments() {
        if (this.allCommentLoaded) {
            return;
        }
        this.allCommentLoaded = true;
        this.feed.object.comments.samples = await this.feed.getComments();
    }
}
