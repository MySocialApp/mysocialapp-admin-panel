import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CasualLayout} from './casual.component';


describe('CasualComponent', () => {
    let component: CasualLayout;
    let fixture: ComponentFixture<CasualLayout>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CasualLayout]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CasualLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
