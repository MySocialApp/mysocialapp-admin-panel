import {NgModule} from '@angular/core';
import {SegmentProgressionColorPipe} from './segment-progression-color/segment-progression-color.pipe';
import {CommonModule} from '@angular/common';
import {TruncateDecimalPipe} from './truncate/truncate-decimal.pipe';
import {AvatarPipe} from './images/avatar.pipe';

@NgModule({
    declarations: [SegmentProgressionColorPipe, TruncateDecimalPipe, AvatarPipe],
    exports: [SegmentProgressionColorPipe, TruncateDecimalPipe, AvatarPipe],
    providers: [SegmentProgressionColorPipe, TruncateDecimalPipe, AvatarPipe],
    imports: [CommonModule]
})
export class PipesModule {

    static forRoot() {
        return {
            ngModule: PipesModule,
            providers: [],
        };
    }

}
