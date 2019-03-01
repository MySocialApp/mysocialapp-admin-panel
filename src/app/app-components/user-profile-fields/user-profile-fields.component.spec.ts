import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileFieldsComponent } from './user-profile-fields.component';

describe('UserProfileFieldsComponent', () => {
  let component: UserProfileFieldsComponent;
  let fixture: ComponentFixture<UserProfileFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
