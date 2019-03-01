import {Component, Input, OnInit} from '@angular/core';
import {CustomField} from 'mysocialapp-ts-client/lib/models/custom_field';

@Component({
    selector: 'app-custom-field-input',
    templateUrl: './custom-field-input.component.html',
    styleUrls: ['./custom-field-input.component.scss']
})
export class CustomFieldInputComponent implements OnInit {

    @Input() public field: CustomField;

    constructor() {
    }

    ngOnInit() {
        console.log(this.field);
    }

}
