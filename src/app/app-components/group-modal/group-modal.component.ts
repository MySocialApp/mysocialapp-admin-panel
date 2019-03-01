import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Group} from 'mysocialapp-ts-client/lib/models/group';
import {Router} from '@angular/router';

@Component({
    selector: 'app-group-modal',
    templateUrl: './group-modal.component.html',
    styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {

    public descriptionLengthLimit = 200;

    @Input() group: Group;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit() {
    }

    get profile_cover_photo(): string {
        return this.group.profile_cover_photo ? ('url(' + this.group.profile_cover_photo.high_url + ')') : '';
    }

    get profile_photo(): string {
        return this.group.profile_photo ? this.group.profile_photo.medium_url : '';
    }

    get link(): string {
        return this.router.createUrlTree(['group', this.group.id]).toString();
    }
}
