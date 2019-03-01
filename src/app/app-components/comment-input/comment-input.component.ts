import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileData} from 'mysocialapp-ts-client/lib/models/file';
import {AppService} from '../../services/app/app.service';
import {CommentPost} from 'mysocialapp-ts-client/lib/models/comment_post';

@Component({
    selector: 'app-comment-input',
    templateUrl: './comment-input.component.html',
    styleUrls: ['./comment-input.component.scss']
})
export class CommentInputComponent implements OnInit {

    text = '';
    image: FileData = null;
    public = true;

    @Output()
    comment = new EventEmitter<CommentPost>();

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
        const commentPost = new CommentPost();

        if (this.text.length > 0) {
            commentPost.setMessage(this.text);
        }

        if (this.image != null) {
            commentPost.setImage(this.image);
        }

        this.comment.emit(commentPost);
        this.clear();
    }

    processFile(event) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            this.image = new FileData().loadFromFileBrowser(file);
        }
    }

}
