import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {pagesToggleService} from '../../services/toggler.service';

declare var pg: any;

@Component({
    selector: 'pg-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    _headerClass = '';
    isHorizontalLayout: false;
    _service;
    @Input()
    boxed: boolean = false;

    @Input()
    extraClass: string = '';

    constructor(private toggler: pagesToggleService) {
    }

    ngOnInit() {
        this.isHorizontalLayout = pg.isHorizontalLayout;
        this._service = this.toggler.headerClass
            .subscribe(state => {
                this._headerClass = state;
            });
    }

    ngOnDestroy() {
        this._service.unsubscribe();
    }
}
