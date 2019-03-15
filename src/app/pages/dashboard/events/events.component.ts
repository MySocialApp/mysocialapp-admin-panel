import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchResults} from 'mysocialapp-ts-client/lib/models/search_results';
import {AppService} from '../../../services/app/app.service';
import {SortOrder} from 'mysocialapp-ts-client/lib/models/sort_order';
import {SearchEvent} from 'mysocialapp-ts-client/lib/search/event';
import {FormGroup} from '@angular/forms';
import {Event} from 'mysocialapp-ts-client/lib/models/event';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventModalComponent} from '../../../app-components/event-modal/event-modal.component';
import {ConfirmModalComponent} from '../../../app-components/confirm-modal/confirm-modal.component';
import {EventEditModalComponent} from '../../../app-components/event-edit-modal/event-edit-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {defaultAvatar} from '../../../services/default.service';
import {Location} from 'mysocialapp-ts-client/lib/models/location';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import * as moment from 'moment';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

    searchResults: SearchResults;

    public form = new FormGroup({});
    public model = {
        id: '',
        name: '',
        ownerFirstName: '',
        ownerLastName: '',
        fromDate: null,
        toDate: null,
        location: new Location({complete_address: null}),
        distance: null
    };

    public page = 1;
    public maxSize = 10;
    public listSizePerPage = 20;
    public loading = false;

    public memberPage = 1;

    @ViewChild('placesRef') placesRef: GooglePlaceDirective;

    // Expandable Table Code;
    @ViewChild('expTable') expTable: any;
    expanded: any = {};

    constructor(private appService: AppService,
                private modalService: NgbModal,
                private _DomSanitizationService: DomSanitizer) {
    }

    ngOnInit() {
        this.fetchEvents();
    }

    public handleAddressChange(address: Address) {
        this.model.location = new Location({
            location: {
                latitude: address.geometry.location.lat(),
                longitude: address.geometry.location.lng()
            },
            complete_address: address.formatted_address
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
        if (this.model.fromDate) {
            search.setFromDate(moment(this.model.fromDate));
        }
        if (this.model.toDate) {
            search.setToDate(moment(this.model.toDate));
        }
        if (this.model.location.complete_address) {
            search.setLocation(this.model.location);
        }
        if (this.model.distance) {
            search.setLocationMaximumDistanceInKilometers(this.model.distance);
        }
        this.searchResults = await session.event.search(search, this.page - 1, this.listSizePerPage);
        if (this.searchResults.matched_count === 0) {
            this.searchResults.matched_types = [];
        }
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

    handleAction() {
        this.fetchEvents();
    }

    viewEvent(event: Event) {
        const modalRef = this.modalService.open(EventModalComponent);
        modalRef.componentInstance.event = event;
    }

    editEvent(event: Event) {
        const modalRef = this.modalService.open(EventEditModalComponent);
        modalRef.componentInstance.event = event;
    }

    async createEvent() {
      const event = new Event();
      event.owner = await this.appService.getAccount();
      event.location = new Location({
        location: {
          latitude: null,
          longitude: null
        },
        complete_address: null
      });
      const modalRef = this.modalService.open(EventEditModalComponent);
      modalRef.componentInstance.event = event;
    }

    async askConfirmDelete(event: Event) {
        const modalRef = this.modalService.open(ConfirmModalComponent, {});
        modalRef.componentInstance.message = `Are you sure you want to delete ${event.displayed_name}?`;

        modalRef.result.then(async () => {
            await event.delete();
            for (let i = 0; i < this.searchResults.results_by_type.event.data.length; i++) {
                this.searchResults.results_by_type.event.data.splice(i, 1);
            }
        });
    }

    onDetailToggle(event) {
    }

    toggleExpandRow(row) {
        this.expTable.rowDetail.toggleExpandRow(row);
    }
}
