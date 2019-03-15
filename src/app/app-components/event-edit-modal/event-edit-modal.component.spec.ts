import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventEditModalComponent} from './event-edit-modal.component';

describe('EventEditModalComponent', () => {
    let component: EventEditModalComponent;
    let fixture: ComponentFixture<EventEditModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventEditModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
