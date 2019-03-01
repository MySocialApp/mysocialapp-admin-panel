import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-window-size-listener',
    templateUrl: './window-size-listener.component.html',
    styleUrls: ['./window-size-listener.component.scss']
})
export class WindowSizeListenerComponent implements OnInit {

    @Output()
    height = new EventEmitter<number>();

    @Input()
    topOffset = 0;

    // header height of casual theme
    private headerHeight = 106;

    constructor() {
    }

    ngOnInit() {
        this.onResize();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        const h = window.innerHeight - (this.headerHeight + this.topOffset);
        this.height.emit(h);
        // console.log('innerHeight: ' + window.innerHeight + ' ;height: ' + h + ' ;headerHeight: ' + this.headerHeight + ' ;topOffset: ' + this.topOffset);
    }

}
