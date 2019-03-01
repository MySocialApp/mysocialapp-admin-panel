import {Component, Input, OnInit} from '@angular/core';
import {Group} from 'mysocialapp-ts-client/lib/models/group';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupEditModalComponent} from '../../../../../app-components/group-edit-modal/group-edit-modal.component';
import {AppService} from '../../../../../services/app/app.service';
import {UserSearchModalComponent} from '../../../../../app-components/user-search-modal/user-search-modal.component';
import {RestGroup} from 'mysocialapp-ts-client/lib/rest/group';

@Component({
    selector: 'app-group-profile',
    templateUrl: './group-profile.component.html',
    styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit {

    @Input() public group: Group = null;

    constructor(private modalService: NgbModal,
                private appService: AppService) {
    }

    ngOnInit() {
    }

    get profile_cover_photo(): string {
        return this.group.profile_cover_photo ? ('url(' + this.group.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.group.profile_photo ? this.group.profile_photo.medium_url : '';
    }

    async editGroup() {
        const modalRef = this.modalService.open(GroupEditModalComponent);
        modalRef.componentInstance.group = this.group;
        const result = await modalRef.result;
        if (result && result.cancel) {
            const session = this.appService.getSession();
            this.group = await session.group.get(this.group.id);
        }
        if (result && result.group) {
            this.group = result.group as Group;
        }
    }

    async changeOwner() {
      const modalRef = this.modalService.open(UserSearchModalComponent);
      modalRef.componentInstance.defaultName = this.group.owner.full_name;
      const result = await modalRef.result;
      console.log(result);
      if (result) {
        const session = await this.appService.getSession();
        const userSession = await session.getSessionAs(this.group.owner.id);
        let group = await userSession.group.get(this.group.id);
        group = await group.changeOwner(result.id);
        this.group = await session.group.get(group.id);
      }
    }

}
