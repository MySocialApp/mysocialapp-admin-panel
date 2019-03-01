import {Component, HostBinding} from '@angular/core';
import {AppService} from './services/app/app.service';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: `
    <router-outlet *ngIf="!loading"></router-outlet>
  `,
})
export class AppComponent {

    loading = true;

    constructor(private appService: AppService, private domSanitizer: DomSanitizer) {
        this.appService.init().then(() => {
            this.loading = false;
        });
    }

    @HostBinding('style')
    get style(): SafeStyle {
      const c = this.appService.getConfigOrNull();
      if (c != null) {
        return this.domSanitizer.bypassSecurityTrustStyle(
          '--primary: ' + c.primary_color
        );
      } else {
        return null;
      }
    }
}
