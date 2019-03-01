import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';
import {Photo} from 'mysocialapp-ts-client/lib/models/photo';
import {DomSanitizer} from '@angular/platform-browser';
import {UserModalComponent} from '../user-modal/user-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FeedItemModalComponent} from '../feed-item-modal/feed-item-modal.component';
import {AppService} from '../../services/app/app.service';
import {RestFeed} from 'mysocialapp-ts-client/lib/rest/feed';
import {MessageService} from '../../@pages/components/message/message.service';
import {NotificationMessageStyle} from '../../models/notification_message_style';
import {Router} from '@angular/router';


@Component({
    selector: 'app-feed-item',
    templateUrl: './feed-item.component.html',
    styleUrls: ['./feed-item.component.scss'],
    entryComponents: [UserModalComponent, FeedItemModalComponent]
})
export class FeedItemComponent implements OnInit {


    @Input()
    public item: Feed;
    @Input()
    public showEditBtn: boolean;

    @Output()
    onCommentClick = new EventEmitter<Feed>();

    public type = 'aside';
    public truncate = 500;
    public deleting = false;

    constructor(private _DomSanitizationService: DomSanitizer,
                private modalService: NgbModal,
                private appService: AppService,
                private router: Router,
                private messageService: MessageService) {
    }

    ngOnInit() {
    }

    get photo(): any {
        if (this.item && this.item.object && this.item.object.type === 'Photo') {
            const p = this.item.object as Photo;
            return this._DomSanitizationService.bypassSecurityTrustUrl(p.high_url);
        }
        return null;
    }

    async delete() {
        this.deleting = true;
        const session = await this.appService.getSession();
        const userSession = await session.getSessionAs(this.item.object.owner.id);
        await new RestFeed(userSession.clientService.configuration).delete(this.item.id);
        this.item = undefined;
    }

    async like() {
        if (this.item.object.isLiked()) {
            await this.item.object.deleteLike();
            this.item.object.likes.has_like = false;
            this.item.object.likes.total -= 1;
            return;
        }

        try {
            await this.item.addLike();
            this.item.object.likes.has_like = true;
            this.item.object.likes.total += 1;
        } catch (e) {
            this.messageService.error(e.message, NotificationMessageStyle);
        }
    }

    visitProfile() {
        this.router.navigate(['user', this.item.actor.id]);
    }
}
