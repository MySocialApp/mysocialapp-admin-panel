import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserModalComponent} from './user-modal/user-modal.component';
import {GroupModalComponent} from './group-modal/group-modal.component';
import {EventModalComponent} from './event-modal/event-modal.component';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FeedItemComponent} from './feed-item/feed-item.component';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {EventEditModalComponent} from './event-edit-modal/event-edit-modal.component';
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
import {pgDatePickerModule} from '../@pages/components/datepicker/datepicker.module';
import {pgTimePickerModule} from '../@pages/components/time-picker/timepicker.module';

@NgModule({
    declarations: [
        UserModalComponent,
        EventModalComponent,
        GroupModalComponent,
        FeedItemComponent,
        ConfirmModalComponent,
        GroupEditModalComponent,
        EventEditModalComponent,
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
        pgDatePickerModule,
        pgTimePickerModule,
    ],
    exports: [
        GroupModalComponent,
        FeedItemComponent,
        ConfirmModalComponent,
        EventEditModalComponent,
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
