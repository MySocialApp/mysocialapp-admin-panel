import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../../../services/app/app.service';
import {Group} from 'mysocialapp-ts-client/lib/models/group';
import {Feed} from 'mysocialapp-ts-client/lib/models/feed';
import {GroupMember} from 'mysocialapp-ts-client/lib/models/group_member';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserModalComponent} from '../../../app-components/user-modal/user-modal.component';
import {defaultAvatar} from '../../../services/default.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SearchResults} from 'mysocialapp-ts-client/lib/models/search_results';
import {FormGroup} from '@angular/forms';
import {SearchGroup} from 'mysocialapp-ts-client/lib/search/group';
import {SortOrder} from 'mysocialapp-ts-client/lib/models/sort_order';
import {GroupStatus} from 'mysocialapp-ts-client/lib/models/group_status';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

    @ViewChild('confirmDeletion') private confirmDeletion: TemplateRef<any>;
    @ViewChild('searchGroup') private searchGroup: TemplateRef<any>;
    @ViewChild('confirmGroup') private confirmGroup: TemplateRef<any>;

    public group: Group;
    public chosenGroup: Group;
    public itemsPerFeed = 10;
    public currentFeedPage = 0;
    public feedItems: Feed[] = [];
    public memberPage = 1;
    public maxSize = 10;
    public listSizePerPage = 20;
    public loading = false;
    public deleting = false;
    public pushedMembers = -1;
    public members: GroupMember[];

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
            this.getGroup(params.id).then(() => {
                this.getGroupFeed();
                this.getGroupPageMembers();
            });
        });
    }

    async getGroup(groupId: string) {
        if (this.group && this.group.id === groupId) {
            return;
        }
        const session = this.appService.getSession();
        this.group = await session.group.get(groupId);
    }

    async getGroupFeed() {
        if (!this.group) {
            return;
        }
        try {
            const session = this.appService.getSession();
            const userSession = await session.getSessionAs(this.group.owner.id);
            const group = await userSession.group.get(this.group.id);
            this.feedItems = await group.listNewsFeed(this.currentFeedPage, this.itemsPerFeed);
        } catch (err) {
            console.info('error getting group feed', err);
        }
    }

    get profile_cover_photo(): string {
        return this.group.profile_cover_photo ? ('url(' + this.group.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.group.profile_photo ? this.group.profile_photo.medium_url : '';
    }

    async getGroupPageMembers() {
        const members = await this.group.getMembers();
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

    deleteGroup() {
      this.modalService.open(this.confirmDeletion, {
        backdrop: true,
        centered: true,
        size: 'sm',
      });
    }

    doSearchGroup() {
      this.modalService.open(this.searchGroup, {
        backdrop: true,
        centered: true,
        size: 'lg',
      });
    }

    closeModal() {
      this.modalService.dismissAll();
    }

    async doDeleteGroup() {
      this.deleting = true;
      const session = this.appService.getSession();
      const userSession = await session.getSessionAs(this.group.owner.id);
      const group = await userSession.group.get(this.group.id);
      group.delete().then(() => {
        this.deleting = false;
        this._location.back();
      }, () => {
        this.deleting = false;
        this.closeModal();
      });
    }

    async fetchGroups() {
      this.loading = true;
      const session = await this.appService.getSession();

      if (this.model.id) {
        await this.searchGroupById(this.model.id);
        this.loading = false;
        return;
      }

      const search = new SearchGroup().setOrder(SortOrder.Desc);
      if (this.model.name) {
        search.setName(this.model.name);
      }
      if (this.model.ownerFirstName) {
        search.setOwnerFirstName(this.model.ownerFirstName);
      }
      if (this.model.ownerLastName) {
        search.setOwnerFirstName(this.model.ownerLastName);
      }
      this.searchResults = await session.group.search(search, this.page - 1, this.listSizePerPage);
      this.loading = false;
    }

    async searchGroupById(groupId: string) {
      try {
        const session = await this.appService.getSession();
        const group = await session.group.get(groupId);
      } catch (err) {
        this.searchResults.matched_count = 0;
        this.searchResults.matched_types = [];
      }
    }

    getPhoto(group: Group): any {
      return group && group.displayed_photo ?
        (this._DomSanitizationService.bypassSecurityTrustUrl(group.displayed_photo.medium_url)) : defaultAvatar;
    }

    pageChange() {
      this.fetchGroups();
    }

    pushUsersToGroup(group: Group) {
      this.chosenGroup = group;
      this.closeModal();
      this.modalService.open(this.confirmGroup, {
        backdrop: true,
        centered: true,
        size: 'sm',
      });
    }

    async doPushUsersToGroup() {
      this.pushedMembers = 0;
      const members = await this.group.getMembers();
      for (const m of members) {
        const session = await this.appService.getSession().getSessionAs(m.user.id);
        const group = await session.group.get(this.chosenGroup.id, true);
        group.join();
        this.pushedMembers++;
      }
      this.closeModal();
      this.pushedMembers = -1;
    }

    isMember(member: GroupMember): Boolean {
      return member.status === GroupStatus.Member;
    }

    async switchMember(member: GroupMember) {
      const session = await this.appService.getSession().getSessionAs(member.user.id);
      const group = await session.group.get(this.group.id);
      if (this.isMember(member)) {
        await group.leave();
        member.status = GroupStatus.WasMember;
      } else {
        await group.join();
        member.status = GroupStatus.Member;
      }
    }
}
