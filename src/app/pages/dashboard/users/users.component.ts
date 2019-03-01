import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app/app.service';
import {SearchUser} from 'mysocialapp-ts-client/lib/search/user';
import {SortOrder} from 'mysocialapp-ts-client/lib/models/sort_order';
import {SearchResults} from 'mysocialapp-ts-client/lib/models/search_results';
import {Gender} from 'mysocialapp-ts-client/lib/models/gender';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';
import {Observable, of, Subscription} from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    searchResults: SearchResults = new SearchResults();
    users: User[] = [];
    appService: AppService;
    selectedUser: User;
    selectedFeed: Feed;
    private subscription: Subscription;
    page = 0;

    usersHeight = 0;

    private genders = [
        {label: 'Male', id: 0, value: Gender.Male},
        {label: 'Female', id: 1, value: Gender.Female},
    ];
    public searchModel = {
        full_name: '',
    };

    constructor(app: AppService) {
        this.appService = app;
    }

    async ngOnInit() {
        this.searchResults = await this.fetchUsers(0);
        this.users = this.searchResults.results_by_type.user.data;
    }

    async fetchUsers(page: number): Promise<SearchResults> {
        const session = await this.appService.getSession();
        const search = new SearchUser().setOrder(SortOrder.Desc);

        if (this.searchModel.full_name) {
            search.setFullName(this.searchModel.full_name);
        }

        return session.user.search(search, page, 20);
    }

    fetchUsersObservable(page: number): Observable<Promise<SearchResults>> {
        return of(this.fetchUsers(page));
    }

    isSelectedUser(user: User): boolean {
        return this.selectedUser === user;
    }

    onSelectUser(user: User) {
        this.selectedUser = user;
    }

    async onSearchTextChange(text: string) {
        this.searchModel.full_name = text;
        this.page = 0;

        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.fetchUsersObservable(0).subscribe(async promise => {
            this.searchResults = await promise;
            this.users = this.searchResults.results_by_type.user.data;
        });
    }

    async onScrollDown() {
        console.log('on scroll');
        this.page++;
        const r = await this.fetchUsers(this.page);
        r.results_by_type.user.data.forEach(u => this.users.push(u));
    }
}
