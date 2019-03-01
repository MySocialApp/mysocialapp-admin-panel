import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserModalComponent} from './user-modal/user-modal.component';
import {GroupModalComponent} from './group-modal/group-modal.component';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FeedItemComponent} from './feed-item/feed-item.component';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {GroupEditModalComponent} from './group-edit-modal/group-edit-modal.component';
import {FormsModule} from '@angular/forms';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {CustomFieldInputComponent} from './custom-field-input/custom-field-input.component';
import {SharedModule} from '../@pages/components/shared.module';
import {FeedItemModalComponent} from './feed-item-modal/feed-item-modal.component';
import {CommentItemComponent} from './comment-item/comment-item.component';
import {CommentsComponent} from './comments/comments.component';
import {UserProfileAvatarComponent} from './user-profile-avatar/user-profile-avatar.component';
import {UserSearchComponent} from './user-search/user-search.component';
import {CommentInputComponent} from './comment-input/comment-input.component';
import {pgSwitchModule} from '../@pages/components/switch/switch.module';
import {UserSearchModalComponent} from './user-search-modal/user-search-modal.component';
import {WindowSizeListenerComponent} from './window-size-listener/window-size-listener.component';

@NgModule({
    declarations: [
        UserModalComponent,
        GroupModalComponent,
        FeedItemComponent,
        ConfirmModalComponent,
        GroupEditModalComponent,
        CustomFieldInputComponent,
        FeedItemModalComponent,
        CommentItemComponent,
        CommentsComponent,
        UserProfileAvatarComponent,
        UserSearchComponent,
        UserSearchModalComponent,
        CommentInputComponent,
        WindowSizeListenerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModalModule,
        GooglePlaceModule,
        SharedModule,
        NgbDropdownModule,
        pgSwitchModule,
    ],
    exports: [
        GroupModalComponent,
        FeedItemComponent,
        ConfirmModalComponent,
        GroupEditModalComponent,
        UserModalComponent,
        CustomFieldInputComponent,
        CommentsComponent,
        UserProfileAvatarComponent,
        UserSearchComponent,
        UserSearchModalComponent,
        CommentInputComponent,
        WindowSizeListenerComponent,
    ],
    entryComponents: [
        UserModalComponent,
        UserSearchModalComponent,
    ]
})
export class AppComponentsModule {
}
