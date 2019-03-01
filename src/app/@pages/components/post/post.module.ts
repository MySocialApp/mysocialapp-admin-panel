import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {pgPost} from './post.component';

@NgModule({
    declarations: [pgPost],
    exports: [pgPost],
    imports: [CommonModule]
})

export class pgPostModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: pgPostModule
        };
    }
}
