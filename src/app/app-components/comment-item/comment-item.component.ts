import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AppService} from '../../services/app/app.service';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {defaultAvatar} from '../../services/default.service';
import {Comment} from 'mysocialapp-ts-client/lib/models/comment';
import {RestFeedComment} from 'mysocialapp-ts-client/lib/rest/feed_comment';
import {ErrorResponse} from 'mysocialapp-ts-client/lib/rest/error';
import {CommentPost} from 'mysocialapp-ts-client/lib/models/comment_post';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

    @Input()
    comment: Comment;

    @Input()
    feed: Feed;

    constructor(private _DomSanitizationService: DomSanitizer,
                private appService: AppService) {
    }

    ngOnInit() {
    }

    getItemOwnerPhoto(owner: User): any {
        if (owner.displayed_photo) {
            return this._DomSanitizationService.bypassSecurityTrustUrl(owner.displayed_photo.medium_url);
        }
        return defaultAvatar;
    }

    getCommentPhoto(comment: Comment): any {
        return comment.photo ? this._DomSanitizationService.bypassSecurityTrustUrl(comment.photo.high_url) : null;
    }

    async deleteComment(comment: Comment) {
        comment['deleting'] = true;
        const session = await this.appService.getSession();
        const userSession = await session.getSessionAs(comment.owner.id);
        try {
            await new RestFeedComment(userSession.clientService.configuration).delete(comment.parent.id, comment.id);
            for (let i = 0; i < this.feed.object.comments.samples.length; i++) {
                const c = this.feed.object.comments.samples[i];
                if (c.id === comment.id) {
                    this.feed.object.comments.samples.splice(i, 1);
                }
            }
        } catch (err) {
            err = err as ErrorResponse;
            console.log(err);
        }
    }

    async updateComment(comment: Comment) {
        const session = await this.appService.getSession();
        const userSession = await session.getSessionAs(comment.owner.id);
        const updatedComment = await new RestFeedComment(userSession.clientService.configuration)
            .update(comment.parent.id, comment.id, new CommentPost().setMessage(comment.bodyMessage));
        for (let i = 0; i < this.feed.object.comments.samples.length; i++) {
            if (this.feed.object.comments.samples[i].id === updatedComment.id) {
                this.feed.object.comments.samples[i] = updatedComment;
            }
        }
    }

}
