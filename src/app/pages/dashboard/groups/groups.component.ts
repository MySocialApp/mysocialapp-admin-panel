import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchResults} from 'mysocialapp-ts-client/lib/models/search_results';
import {AppService} from '../../../services/app/app.service';
import {SortOrder} from 'mysocialapp-ts-client/lib/models/sort_order';
import {SearchGroup} from 'mysocialapp-ts-client/lib/search/group';
import {FormGroup} from '@angular/forms';
import {Group} from 'mysocialapp-ts-client/lib/models/group';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupModalComponent} from '../../../app-components/group-modal/group-modal.component';
import {ConfirmModalComponent} from '../../../app-components/confirm-modal/confirm-modal.component';
import {GroupEditModalComponent} from '../../../app-components/group-edit-modal/group-edit-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {defaultAvatar} from '../../../services/default.service';
import {Location} from 'mysocialapp-ts-client/lib/models/location';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {

    searchResults: SearchResults;

    public form = new FormGroup({});
    public model = {
        id: '',
        name: '',
        ownerFirstName: '',
        ownerLastName: '',
    };

    public page = 1;
    public maxSize = 10;
    public listSizePerPage = 20;
    public loading = false;

    public memberPage = 1;

    // Expandable Table Code;
    @ViewChild('expTable') expTable: any;
    expanded: any = {};

    constructor(private appService: AppService,
                private modalService: NgbModal,
                private _DomSanitizationService: DomSanitizer) {
    }

    ngOnInit() {
        this.fetchGroups();
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

    handleAction() {
        this.fetchGroups();
    }

    viewGroup(group: Group) {
        const modalRef = this.modalService.open(GroupModalComponent);
        modalRef.componentInstance.group = group;
    }

    editGroup(group: Group) {
        const modalRef = this.modalService.open(GroupEditModalComponent);
        modalRef.componentInstance.group = group;
    }

    async createGroup() {
      const group = new Group();
      group.owner = await this.appService.getAccount();
      group.location = new Location({
        location: {
          latitude: null,
          longitude: null
        },
        complete_address: null
      });
      const modalRef = this.modalService.open(GroupEditModalComponent);
      modalRef.componentInstance.group = group;
    }

    async askConfirmDelete(group: Group) {
        const modalRef = this.modalService.open(ConfirmModalComponent, {});
        modalRef.componentInstance.message = `Are you sure you want to delete ${group.displayed_name}?`;

        modalRef.result.then(async () => {
            await group.delete();
            for (let i = 0; i < this.searchResults.results_by_type.group.data.length; i++) {
                this.searchResults.results_by_type.group.data.splice(i, 1);
            }
        });
    }

    onDetailToggle(event) {
    }

    toggleExpandRow(row) {
        this.expTable.rowDetail.toggleExpandRow(row);
    }
}
