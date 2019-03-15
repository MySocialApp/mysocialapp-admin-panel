import {Component, Input, OnInit} from '@angular/core';
import {Event} from 'mysocialapp-ts-client/lib/models/event';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventEditModalComponent} from '../../../../../app-components/event-edit-modal/event-edit-modal.component';
import {AppService} from '../../../../../services/app/app.service';
import {UserSearchModalComponent} from '../../../../../app-components/user-search-modal/user-search-modal.component';
import {RestEvent} from 'mysocialapp-ts-client/lib/rest/event';

@Component({
    selector: 'app-event-profile',
    templateUrl: './event-profile.component.html',
    styleUrls: ['./event-profile.component.scss']
})
export class EventProfileComponent implements OnInit {

    @Input() public event: Event = null;

    constructor(private modalService: NgbModal,
                private appService: AppService) {
    }

    ngOnInit() {
    }

    get profile_cover_photo(): string {
        return this.event.profile_cover_photo ? ('url(' + this.event.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.event.profile_photo ? this.event.profile_photo.medium_url : '';
    }

    async editEvent() {
        const modalRef = this.modalService.open(EventEditModalComponent);
        modalRef.componentInstance.event = this.event;
        const result = await modalRef.result;
        if (result && result.cancel) {
            const session = this.appService.getSession();
            this.event = await session.event.get(this.event.id);
        }
        if (result && result.event) {
            this.event = result.event as Event;
        }
    }

    async changeOwner() {
      const modalRef = this.modalService.open(UserSearchModalComponent);
      modalRef.componentInstance.defaultName = this.event.owner.full_name;
      const result = await modalRef.result;
      console.log(result);
      if (result) {
        const session = await this.appService.getSession();
        const userSession = await session.getSessionAs(this.event.owner.id);
        let event = await userSession.event.get(this.event.id);
        event = await event.changeOwner(result.id);
        this.event = await session.event.get(event.id);
      }
    }

}
