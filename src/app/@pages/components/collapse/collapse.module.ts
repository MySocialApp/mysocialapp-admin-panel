import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {pgCollapseComponent} from './collapse.component';
import {pgCollapsesetComponent} from './collapseset.component';

export const PG_COLLAPSE_DIRECTIVES = [pgCollapsesetComponent, pgCollapseComponent];

@NgModule({
    declarations: PG_COLLAPSE_DIRECTIVES,
    exports: PG_COLLAPSE_DIRECTIVES,
    imports: [CommonModule]
})

export class pgCollapseModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: pgCollapseModule
        };
    }
}
