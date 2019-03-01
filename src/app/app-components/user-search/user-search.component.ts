import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../../services/app/app.service';
import {MessageService} from '../../@pages/components/message/message.service';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {SearchResults} from 'mysocialapp-ts-client/lib/models/search_results';
import {Gender} from 'mysocialapp-ts-client/lib/models/gender';
import {SearchUser} from 'mysocialapp-ts-client/lib/search/user';
import {SortOrder} from 'mysocialapp-ts-client/lib/models/sort_order';
import {Observable, of, Subscription} from 'rxjs';

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  searchResults: SearchResults = new SearchResults();
  users: User[] = [];
  selectedUser: User;
  private subscription: Subscription;
  page = 0;

  @Output()
  onSelectedUser = new EventEmitter<User>();

  @Input() usersHeight: number;

  @Input() defaultName: string;

  public searchModel = {
    full_name: this.defaultName,
  };

  constructor(private route: ActivatedRoute,
              private appService: AppService,
              private messageService: MessageService) {
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
    this.onSelectedUser.emit(user);
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
