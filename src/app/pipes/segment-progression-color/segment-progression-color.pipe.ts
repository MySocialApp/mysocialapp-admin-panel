import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'segmentProgressionColor'
})
export class SegmentProgressionColorPipe implements PipeTransform {

    transform(percent: number, segmentType: string): string {
        switch (segmentType) {
            case 'INACTIVE':
                return this.getInversedColor(percent);
            case 'PASSIVE':
                return this.getInversedColor(percent);
            default:
                return this.getDefaultColor(percent);
        }
    }

    private getDefaultColor(percent: number): string {
        if (percent === 0) {
            return 'text-secondary';
        } else if (percent < 0) {
            return 'text-warning';
        } else if (percent < 3) {
            return 'text-danger';
        } else if (percent > 0) {
            return 'text-success';
        } else {
            return 'text-secondary';
        }
    }

    private getInversedColor(percent: number): string {
        if (percent === 0) {
            return 'text-secondary';
        } else if (percent < 0) {
            return 'text-success';
        } else if (percent > 3) {
            return 'text-danger';
        } else if (percent > 0) {
            return 'text-warning';
        } else {
            return 'text-secondary';
        }
    }

}
