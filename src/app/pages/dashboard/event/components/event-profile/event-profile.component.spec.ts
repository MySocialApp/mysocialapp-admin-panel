import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventProfileComponent} from './event-profile.component';

describe('EventProfileComponent', () => {
    let component: EventProfileComponent;
    let fixture: ComponentFixture<EventProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
