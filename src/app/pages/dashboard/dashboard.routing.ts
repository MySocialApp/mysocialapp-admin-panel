import {Routes} from '@angular/router';
import {GroupsComponent} from './groups/groups.component';
import {UsersComponent} from './users/users.component';
import {GroupComponent} from './group/group.component';
import {NewsfeedComponent} from './newsfeed/newsfeed.component';
import {UserComponent} from './user/user.component';
import {EventsComponent} from './events/events.component';
import {EventComponent} from './event/event.component';

export const dashboardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                data: {
                    title: 'Newsfeed'
                },
                path: 'newsfeed',
                component: NewsfeedComponent,
            },
            {
                data: {
                    title: 'Users management'
                },
                path: 'users',
                component: UsersComponent,
            },
            {
                data: {
                    title: 'User details'
                },
                path: 'user/:id',
                component: UserComponent,
            },
            {
                data: {
                    title: 'Groups management'
                },
                path: 'groups',
                component: GroupsComponent,
            },
            {
                data: {
                    title: 'Group details'
                },
                path: 'group/:id',
                component: GroupComponent,
            },
            {
                data: {
                    title: 'Events management'
                },
                path: 'events',
                component: EventsComponent,
            },
            {
                data: {
                    title: 'Event details'
                },
                path: 'event/:id',
                component: EventComponent,
            }
        ],
    },
];
