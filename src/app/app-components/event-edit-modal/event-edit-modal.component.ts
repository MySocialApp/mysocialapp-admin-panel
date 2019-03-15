import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Event} from 'mysocialapp-ts-client/lib/models/event';
import {Location} from 'mysocialapp-ts-client/lib/models/location';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {EventMemberAccessControl} from 'mysocialapp-ts-client/lib/models/event_member_access_control';
import {AppService} from '../../services/app/app.service';
import {ErrorResponse} from 'mysocialapp-ts-client/lib/rest/error';
import {RestEvent} from 'mysocialapp-ts-client/lib/rest/event';
import {FluentEvent} from 'mysocialapp-ts-client/lib/fluent_event';

@Component({
    selector: 'app-event-edit-modal',
    templateUrl: './event-edit-modal.component.html',
    styleUrls: ['./event-edit-modal.component.scss']
})
export class EventEditModalComponent implements OnInit {

    @Input() event: Event;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;
    public accessControls = [
        {label: 'Public', value: EventMemberAccessControl.Public},
        {label: 'Friend of Friend', value: EventMemberAccessControl.FriendOfFriend},
    ];
    public updating = false;

    constructor(public activeModal: NgbActiveModal, public appService: AppService) {
    }

    ngOnInit() {
    }

    get profile_cover_photo(): string {
        return this.event.profile_cover_photo ? ('url(' + this.event.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.event.profile_photo ? this.event.profile_photo.medium_url : '';
    }

    public handleAddressChange(address: Address) {
        this.event.location = new Location({
            location: {
                latitude: address.geometry.location.lat(),
                longitude: address.geometry.location.lng()
            },
            complete_address: address.formatted_address
        });
    }

    public isCreation(): boolean {
      return this.event.id === null || this.event.id === undefined;
    }

    public async cancel() {
        this.activeModal.close({cancel: true});
    }

    public async update() {
        this.updating = true;
        try {
            const session = await this.appService.getSession();
            const userSession = await session.getSessionAs(this.event.owner.id);
            if (this.isCreation()) {
              this.event = await userSession.event.create(this.event);
            } else {
              this.event = await new RestEvent(userSession.clientService.configuration).update(this.event);
            }
            this.activeModal.close(this.event);
        } catch (err) {
            err = err as ErrorResponse;
            console.log(err);
        }
    }
}
