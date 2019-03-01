// Angular Dependencies
import {NgModule} from '@angular/core';

import {pgCardModule} from '../../@pages/components/card/card.module';
import {pgSwitchModule} from '../../@pages/components/switch/switch.module';
import {pgTabsModule} from '../../@pages/components/tabs/tabs.module';

import {NvD3Module} from 'ngx-nvd3';
import {NgxEchartsModule} from 'ngx-echarts';

import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
// Widgets
import {ImageWidgetComponent} from './widgets/image-widget/image-widget.component';
import {ImageWidgetBasicComponent} from './widgets/image-widget-basic/image-widget-basic.component';
import {GraphTileWidgetComponent} from './widgets/graph-tile-widget/graph-tile-widget.component';
import {PlainWidgetComponent} from './widgets/plain-widget/plain-widget.component';
import {PlainLiveWidgetComponent} from './widgets/plain-live-widget/plain-live-widget.component';
import {GraphLiveWidgetComponent} from './widgets/graph-live-widget/graph-live-widget.component';
import {BarTileWidgetComponent} from './widgets/bar-tile-widget/bar-tile-widget.component';
import {GraphTileFlatWidgetComponent} from './widgets/graph-tile-flat-widget/graph-tile-flat-widget.component';
import {ProgressTileFlatWidgetComponent} from './widgets/progress-tile-flat-widget/progress-tile-flat-widget.component';
import {StatTileWidgetComponent} from './widgets/stat-tile-widget/stat-tile-widget.component';
import {GraphWidgetComponent} from './widgets/graph-widget/graph-widget.component';
import {TableBasicWidgetComponent} from './widgets/table-basic-widget/table-basic-widget.component';
import {RealtimeWidgetComponent} from './widgets/realtime-widget/realtime-widget.component';
import {StackedBarWidgetComponent} from './widgets/stacked-bar-widget/stacked-bar-widget.component';
import {GraphOptionsWidgetComponent} from './widgets/graph-options-widget/graph-options-widget.component';
import {WeatherWidgetComponent} from './widgets/weather-widget/weather-widget.component';
import {TableWidgetComponent} from './widgets/table-widget/table-widget.component';
import {SocialImageTileWidgetComponent} from './widgets/social-image-tile-widget/social-image-tile-widget.component';
import {SocialPostTileWidgetComponent} from './widgets/social-post-tile-widget/social-post-tile-widget.component';
import {ProjectProgressWidgetComponent} from './widgets/project-progress-widget/project-progress-widget.component';
import {WeeklySalesWidgetComponent} from './widgets/weekly-sales-widget/weekly-sales-widget.component';
import {QuickStatsWidgetComponent} from './widgets/quick-stats-widget/quick-stats-widget.component';
import {TodoListWidgetComponent} from './widgets/todo-list-widget/todo-list-widget.component';
import {GraphWidgetBasicComponent} from './widgets/graph-widget-basic/graph-widget-basic.component';
import {UsersComponent} from './users/users.component';
import {GroupsComponent} from './groups/groups.component';
import {GroupComponent} from './group/group.component';
import {NgbDropdownModule, NgbPaginationModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {GroupModalComponent} from '../../app-components/group-modal/group-modal.component';
import {FeedItemComponent} from '../../app-components/feed-item/feed-item.component';
import {ConfirmModalComponent} from '../../app-components/confirm-modal/confirm-modal.component';
import {GroupEditModalComponent} from '../../app-components/group-edit-modal/group-edit-modal.component';
import {AppComponentsModule} from '../../app-components/app-components.module';
import {GroupProfileComponent} from './group/components/group-profile/group-profile.component';
import {SharedModule} from '../../@pages/components/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ButtonsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {FeedItemModalComponent} from '../../app-components/feed-item-modal/feed-item-modal.component';
import {pgSelectModule} from '../../@pages/components/select/select.module';
import {pgDatePickerModule} from '../../@pages/components/datepicker/datepicker.module';
import {MomentModule} from 'ngx-moment';
import {MessageModule} from '../../@pages/components/message/message.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {PostInputComponent} from '../../app-components/post-input/post-input.component';
import {UserProfileFieldsComponent} from '../../app-components/user-profile-fields/user-profile-fields.component';
import {NewsfeedComponent} from './newsfeed/newsfeed.component';
import {WindowSizeListenerComponent} from '../../app-components/window-size-listener/window-size-listener.component';
import {UserProfileComponent} from '../../app-components/user-profile/user-profile.component';
import {UserComponent} from './user/user.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};


const components = [
    ImageWidgetComponent,
    ImageWidgetBasicComponent,
    GraphTileWidgetComponent,
    PlainWidgetComponent,
    PlainLiveWidgetComponent,
    GraphLiveWidgetComponent,
    BarTileWidgetComponent,
    GraphTileFlatWidgetComponent,
    ProgressTileFlatWidgetComponent,
    StatTileWidgetComponent,
    GraphWidgetComponent,
    GraphWidgetBasicComponent,
    TableBasicWidgetComponent,
    // MapWidgetComponent,
    RealtimeWidgetComponent,
    StackedBarWidgetComponent,
    GraphOptionsWidgetComponent,
    WeatherWidgetComponent,
    TableWidgetComponent,
    SocialImageTileWidgetComponent,
    SocialPostTileWidgetComponent,
    ProjectProgressWidgetComponent,
    WeeklySalesWidgetComponent,
    QuickStatsWidgetComponent,
    TodoListWidgetComponent,
    UsersComponent,
    GroupsComponent,
    GroupComponent,
    GroupProfileComponent,
    UserProfileComponent,
    PostInputComponent,
    UserProfileFieldsComponent,
    NewsfeedComponent,
    UserComponent,
];

@NgModule({
    imports: [
        pgCardModule,
        pgTabsModule,
        NvD3Module,
        NgxEchartsModule,
        SwiperModule,
        pgSwitchModule,
        NgbTabsetModule,
        NgbDropdownModule,
        NgbPaginationModule,
        AppComponentsModule,
        SharedModule,
        NgxDatatableModule,
        ButtonsModule,
        FormsModule,
        pgSelectModule,
        pgDatePickerModule,
        MomentModule,
        MessageModule,
        InfiniteScrollModule,
        ScrollingModule,
    ],
    declarations: components,
    exports: components,
    providers: [{
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    }],
    entryComponents: [
        GroupModalComponent,
        FeedItemComponent,
        FeedItemModalComponent,
        ConfirmModalComponent,
        GroupEditModalComponent,
    ]
})
export class DashboardModule {
}
