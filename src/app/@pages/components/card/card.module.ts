import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {pgCard} from './card.component';
import {ProgressModule} from '../progress/progress.module';

@NgModule({
    declarations: [pgCard],
    exports: [pgCard],
    imports: [CommonModule, ProgressModule]
})

export class pgCardModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: pgCardModule
        };
    }
}
