import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../../../services/app/app.service';
import {Event} from 'mysocialapp-ts-client/lib/models/event';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';
import {EventMember} from 'mysocialapp-ts-client/lib/models/event_member';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserModalComponent} from '../../../app-components/user-modal/user-modal.component';
import {defaultAvatar} from '../../../services/default.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SearchResults} from 'mysocialapp-ts-client/lib/models/search_results';
import {FormGroup} from '@angular/forms';
import {SearchEvent} from 'mysocialapp-ts-client/lib/search/event';
import {SortOrder} from 'mysocialapp-ts-client/lib/models/sort_order';
import {EventStatus} from 'mysocialapp-ts-client/lib/models/event_status';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

    @ViewChild('confirmDeletion') private confirmDeletion: TemplateRef<any>;
    @ViewChild('searchEvent') private searchEvent: TemplateRef<any>;
    @ViewChild('confirmEvent') private confirmEvent: TemplateRef<any>;

    public event: Event;
    public chosenEvent: Event;
    public itemsPerFeed = 10;
    public currentFeedPage = 0;
    public feedItems: Feed[] = [];
    public memberPage = 1;
    public maxSize = 10;
    public listSizePerPage = 20;
    public loading = false;
    public deleting = false;
    public pushedMembers = -1;
    public members: EventMember[];

    searchResults: SearchResults;

    public form = new FormGroup({});
    public model = {
      id: '',
      name: '',
      ownerFirstName: '',
      ownerLastName: '',
    };

    public page = 1;

    // Expandable Table Code;
    @ViewChild('expTable') expTable: any;
    expanded: any = {};

    constructor(private route: ActivatedRoute,
                private appService: AppService,
                private modalService: NgbModal,
                private _DomSanitizationService: DomSanitizer,
                private _location: Location) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getEvent(params.id).then(() => {
                this.getEventFeed();
                this.getEventPageMembers();
            });
        });
    }

    async getEvent(eventId: string) {
        if (this.event && this.event.id === eventId) {
            return;
        }
        const session = this.appService.getSession();
        this.event = await session.event.get(eventId);
    }

    async getEventFeed() {
        if (!this.event) {
            return;
        }
        try {
            const session = this.appService.getSession();
            const userSession = await session.getSessionAs(this.event.owner.id);
            const event = await userSession.event.get(this.event.id);
            this.feedItems = await event.listNewsFeed(this.currentFeedPage, this.itemsPerFeed);
        } catch (err) {
            console.info('error getting event feed', err);
        }
    }

    get profile_cover_photo(): string {
        return this.event.profile_cover_photo ? ('url(' + this.event.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.event.profile_photo ? this.event.profile_photo.medium_url : '';
    }

    async getEventPageMembers() {
        const members = await this.event.getMembers();
        this.members = [];
        for (let i = 0; i < this.listSizePerPage; i++) {
            const index = i + ((this.memberPage - 1) * this.listSizePerPage);
            if (members[index] !== undefined) {
                this.members.push(members[index]);
            }
        }
    }

    async viewUser(user: User) {
        const modalRef = this.modalService.open(UserModalComponent);
        modalRef.componentInstance.user = user;
    }

    getMemberAvatar(user: User): any {
        return user && user.displayed_photo ? (this._DomSanitizationService.bypassSecurityTrustUrl(user.displayed_photo.medium_url)) : defaultAvatar;
    }

    deleteEvent() {
      this.modalService.open(this.confirmDeletion, {
        backdrop: true,
        centered: true,
        size: 'sm',
      });
    }

    doSearchEvent() {
      this.modalService.open(this.searchEvent, {
        backdrop: true,
        centered: true,
        size: 'lg',
      });
    }

    closeModal() {
      this.modalService.dismissAll();
    }

    async doDeleteEvent() {
      this.deleting = true;
      const session = this.appService.getSession();
      const userSession = await session.getSessionAs(this.event.owner.id);
      const event = await userSession.event.get(this.event.id);
      event.delete().then(() => {
        this.deleting = false;
        this._location.back();
      }, () => {
        this.deleting = false;
        this.closeModal();
      });
    }

    async fetchEvents() {
      this.loading = true;
      const session = await this.appService.getSession();

      if (this.model.id) {
        await this.searchEventById(this.model.id);
        this.loading = false;
        return;
      }

      const search = new SearchEvent().setOrder(SortOrder.Desc);
      if (this.model.name) {
        search.setName(this.model.name);
      }
      if (this.model.ownerFirstName) {
        search.setOwnerFirstName(this.model.ownerFirstName);
      }
      if (this.model.ownerLastName) {
        search.setOwnerFirstName(this.model.ownerLastName);
      }
      this.searchResults = await session.event.search(search, this.page - 1, this.listSizePerPage);
      this.loading = false;
    }

    async searchEventById(eventId: string) {
      try {
        const session = await this.appService.getSession();
        const event = await session.event.get(eventId);
      } catch (err) {
        this.searchResults.matched_count = 0;
        this.searchResults.matched_types = [];
      }
    }

    getPhoto(event: Event): any {
      return event && event.displayed_photo ?
        (this._DomSanitizationService.bypassSecurityTrustUrl(event.displayed_photo.medium_url)) : defaultAvatar;
    }

    pageChange() {
      this.fetchEvents();
    }

    pushUsersToEvent(event: Event) {
      this.chosenEvent = event;
      this.closeModal();
      this.modalService.open(this.confirmEvent, {
        backdrop: true,
        centered: true,
        size: 'sm',
      });
    }

    async doPushUsersToEvent() {
      this.pushedMembers = 0;
      const members = await this.event.getMembers();
      for (const m of members) {
        const session = await this.appService.getSession().getSessionAs(m.user.id);
        const event = await session.event.get(this.chosenEvent.id, true);
        event.join();
        this.pushedMembers++;
      }
      this.closeModal();
      this.pushedMembers = -1;
    }

    isMember(member: EventMember): Boolean {
      return member.status === EventStatus.Confirmed || member.status === EventStatus.WaitingConfirmation;
    }

    async switchMember(member: EventMember) {
      const session = await this.appService.getSession().getSessionAs(member.user.id);
      const event = await session.event.get(this.event.id);
      if (this.isMember(member)) {
        await event.leave();
        member.status = EventStatus.HasCancelled;
      } else {
        await event.join();
        member.status = EventStatus.Confirmed;
      }
    }
}
