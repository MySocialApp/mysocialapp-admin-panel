import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {pgCardSocial} from './card-social.component';

// import { pgRetinaDirective } from '../retina/retina.directive';

@NgModule({
    declarations: [pgCardSocial],
    exports: [pgCardSocial],
    imports: [CommonModule]
})

export class pgCardSocialModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: pgCardSocialModule
        };
    }
}
