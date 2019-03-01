import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowSizeListenerComponent } from './window-size-listener.component';

describe('WindowSizeListenerComponent', () => {
  let component: WindowSizeListenerComponent;
  let fixture: ComponentFixture<WindowSizeListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowSizeListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowSizeListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
