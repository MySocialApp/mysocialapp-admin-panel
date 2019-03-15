import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Event} from 'mysocialapp-ts-client/lib/models/event';
import {Router} from '@angular/router';

@Component({
    selector: 'app-event-modal',
    templateUrl: './event-modal.component.html',
    styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

    public descriptionLengthLimit = 200;

    @Input() event: Event;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit() {
    }

    get profile_cover_photo(): string {
        return this.event.profile_cover_photo ? ('url(' + this.event.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.event.profile_photo ? this.event.profile_photo.medium_url : '';
    }

    get link(): string {
        return this.router.createUrlTree(['event', this.event.id]).toString();
    }
}
