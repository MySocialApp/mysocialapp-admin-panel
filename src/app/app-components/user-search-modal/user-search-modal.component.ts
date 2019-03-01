import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from 'mysocialapp-ts-client/lib/models/user';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-user-search-modal',
    templateUrl: './user-search-modal.component.html',
    styleUrls: ['./user-search-modal.component.scss']
})
export class UserSearchModalComponent implements OnInit {

  @Output()
  onSelectedUser = new EventEmitter<User>();

  selectedUser: User;

  @Input() defaultName: string;

  usersHeight: 0;

  constructor(public activeModal: NgbActiveModal) {
  }

  async ngOnInit() {
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
  }

  onOk() {
    this.activeModal.close(this.selectedUser);
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
