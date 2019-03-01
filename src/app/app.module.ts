// Angular Core
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
// Routing
import {AppRoutes, AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
// Layouts
import {RootLayoutComponent, SimplyWhiteLayoutComponent} from './@pages/layouts';
// Layout Service - Required
import {pagesToggleService} from './@pages/services/toggler.service';
// Shared Layout Components
import {SidebarComponent} from './@pages/components/sidebar/sidebar.component';
import {QuickviewComponent} from './@pages/components/quickview/quickview.component';
import {QuickviewService} from './@pages/components/quickview/quickview.service';
import {SearchOverlayComponent} from './@pages/components/search-overlay/search-overlay.component';
import {HeaderComponent} from './@pages/components/header/header.component';
import {HorizontalMenuComponent} from './@pages/components/horizontal-menu/horizontal-menu.component';
import {SharedModule} from './@pages/components/shared.module';
import {pgListViewModule} from './@pages/components/list-view/list-view.module';
import {pgCardModule} from './@pages/components/card/card.module';
import {pgCardSocialModule} from './@pages/components/card-social/card-social.module';
// Basic Bootstrap Modules
import {
    AccordionModule,
    AlertModule,
    BsDropdownModule,
    ButtonsModule,
    CollapseModule,
    ModalModule,
    ProgressbarModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule,
} from 'ngx-bootstrap';
// Pages Globaly required Components - Optional
import {pgTabsModule} from './@pages/components/tabs/tabs.module';
import {pgSwitchModule} from './@pages/components/switch/switch.module';
import {ProgressModule} from './@pages/components/progress/progress.module';
// Thirdparty Components / Plugins - Optional
import {QuillModule} from 'ngx-quill';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Sample Blank Pages - Optional
import {pgSelectModule} from './@pages/components/select/select.module';
import {pgDatePickerModule} from './@pages/components/datepicker/datepicker.module';
import {BlankComponent} from './@pages/layouts/blank/blank.component';
import {ConnectedUserGuardModule} from './guards/connected-user-guard.module';
import {AnonymousUserGuard} from './guards/anonymous-user-guard.module';
import {AddHeaderInterceptor} from './utils/http-interceptor.class';
import {PipesModule} from './pipes/pipes.module';
import {ChartsModule} from 'ng2-charts';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from './services/app/app.service';
import {AuthModule} from './pages/auth/auth.module';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import {CasualLayout} from './@pages/layouts/casual/casual.component';
import {MomentModule} from 'ngx-moment';
import {MessageService} from './@pages/components/message/message.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ScrollingModule} from '@angular/cdk/scrolling';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

// Hammer Config Overide
// https://github.com/angular/angular/issues/10541
export class AppHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'pinch': {enable: false},
        'rotate': {enable: false}
    };
}

@NgModule({
    declarations: [
        AppComponent,
        BlankComponent,
        SimplyWhiteLayoutComponent,
        CasualLayout,
        SidebarComponent,
        QuickviewComponent,
        SearchOverlayComponent,
        HeaderComponent,
        HorizontalMenuComponent,
        RootLayoutComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        ProgressModule,
        pgListViewModule,
        pgCardModule,
        pgCardSocialModule,
        RouterModule.forRoot(AppRoutes),
        BsDropdownModule.forRoot(),
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        TypeaheadModule.forRoot(),
        pgTabsModule,
        PerfectScrollbarModule,
        pgSwitchModule,
        QuillModule,
        pgSelectModule,
        pgDatePickerModule,
        PipesModule.forRoot(),
        ChartsModule,
        NgbTooltipModule,
        AppRoutingModule,
        AuthModule,
        DashboardModule,
        pgSelectModule,
        pgDatePickerModule,
        MomentModule,
        InfiniteScrollModule,
        ScrollingModule,
    ],
    providers: [
        AnonymousUserGuard,
        ConnectedUserGuardModule,
        QuickviewService,
        pagesToggleService, {
            provide: HTTP_INTERCEPTORS,
            useClass: AddHeaderInterceptor,
            multi: true,
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: AppHammerConfig
        },
        AppService,
        MessageService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
