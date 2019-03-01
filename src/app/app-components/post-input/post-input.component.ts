import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../services/app/app.service';
import {AccessControl} from 'mysocialapp-ts-client/lib/models/access_control';
import {FeedPost} from 'mysocialapp-ts-client/lib/models/feed_post';
import {FileData} from 'mysocialapp-ts-client/lib/models/file';

@Component({
    selector: 'app-post-input',
    templateUrl: './post-input.component.html',
    styleUrls: ['./post-input.component.scss']
})
export class PostInputComponent implements OnInit {

    text = '';
    image: FileData = null;
    public = true;

    @Output()
    feedPost = new EventEmitter<FeedPost>();

    @Input()
    allowImageUpload = true;

    constructor(public appService: AppService) {
    }

    ngOnInit() {
    }

    isValid(): boolean {
        return this.text.length > 0 || this.image != null;
    }

    clear() {
        this.text = '';
        this.image = null;
    }

    onSend() {
        let visibility = AccessControl.Public;
        if (!this.public) {
            visibility = AccessControl.Friend;
        }

        const feedPost = new FeedPost().setVisibility(visibility);

        if (this.text.length > 0) {
            feedPost.setMessage(this.text);
        }

        if (this.image != null) {
            feedPost.setImage(this.image);
        }

        this.feedPost.emit(feedPost);
        this.clear();
    }

    processFile(event) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            this.image = new FileData().loadFromFileBrowser(file);
        }
    }
}
