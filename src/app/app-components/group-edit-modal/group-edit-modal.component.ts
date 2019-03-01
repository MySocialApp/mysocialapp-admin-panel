import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Group} from 'mysocialapp-ts-client/lib/models/group';
import {Location} from 'mysocialapp-ts-client/lib/models/location';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GroupMemberAccessControl} from 'mysocialapp-ts-client/lib/models/group_member_access_control';
import {AppService} from '../../services/app/app.service';
import {ErrorResponse} from 'mysocialapp-ts-client/lib/rest/error';
import {RestGroup} from 'mysocialapp-ts-client/lib/rest/group';
import {FluentGroup} from 'mysocialapp-ts-client/lib/fluent_group';

@Component({
    selector: 'app-group-edit-modal',
    templateUrl: './group-edit-modal.component.html',
    styleUrls: ['./group-edit-modal.component.scss']
})
export class GroupEditModalComponent implements OnInit {

    @Input() group: Group;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;
    public accessControls = [
        {label: 'Public', value: GroupMemberAccessControl.Public},
        {label: 'Friend of Friend', value: GroupMemberAccessControl.FriendOfFriend},
    ];
    public updating = false;

    constructor(public activeModal: NgbActiveModal, public appService: AppService) {
    }

    ngOnInit() {
    }

    get profile_cover_photo(): string {
        return this.group.profile_cover_photo ? ('url(' + this.group.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.group.profile_photo ? this.group.profile_photo.medium_url : '';
    }

    public handleAddressChange(address: Address) {
        this.group.location = new Location({
            location: {
                latitude: address.geometry.location.lat(),
                longitude: address.geometry.location.lng()
            },
            complete_address: address.formatted_address
        });
    }

    public isCreation(): boolean {
      return this.group.id === null || this.group.id === undefined;
    }

    public async cancel() {
        this.activeModal.close({cancel: true});
    }

    public async update() {
        this.updating = true;
        try {
            const session = await this.appService.getSession();
            const userSession = await session.getSessionAs(this.group.owner.id);
            if (this.isCreation()) {
              this.group = await userSession.group.create(this.group);
            } else {
              this.group = await new RestGroup(userSession.clientService.configuration).update(this.group);
            }
            this.activeModal.close(this.group);
        } catch (err) {
            err = err as ErrorResponse;
            console.log(err);
        }
    }
}
