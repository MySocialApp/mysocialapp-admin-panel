import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';
import {Comment} from 'mysocialapp-ts-client/lib/models/comment';
import {CommentPost} from 'mysocialapp-ts-client/lib/models/comment_post';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

    _feed: Feed;
    comments: Comment[];

    @Output()
    close = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    @Input()
    set feed(f: Feed) {
        this._feed = f;
        this.loadComments();
    }

    get feed(): Feed {
        return this._feed;
    }

    async loadComments() {
        if (this._feed == null) {
            return;
        }

        const x = await this._feed.getComments();
        this.comments = x.reverse();
    }

    async sendComment(comment: CommentPost) {
        const c = await this.feed.addComment(comment);
        this._feed.object.comments.total++;
        this.comments.push(c);
    }

}
