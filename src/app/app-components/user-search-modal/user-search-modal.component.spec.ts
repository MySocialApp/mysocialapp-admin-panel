import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSearchModalComponent} from './user-search.component';

describe('UserComponent', () => {
    let component: UserSearchModalComponent;
    let fixture: ComponentFixture<UserSearchModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserSearchModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserSearchModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
