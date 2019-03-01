import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomFieldInputComponent} from './custom-field-input.component';

describe('CustomFieldInputComponent', () => {
    let component: CustomFieldInputComponent;
    let fixture: ComponentFixture<CustomFieldInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomFieldInputComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomFieldInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
