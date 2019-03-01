import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupEditModalComponent} from './group-edit-modal.component';

describe('GroupEditModalComponent', () => {
    let component: GroupEditModalComponent;
    let fixture: ComponentFixture<GroupEditModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GroupEditModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupEditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
