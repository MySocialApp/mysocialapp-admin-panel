import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncateDecimal'
})
export class TruncateDecimalPipe implements PipeTransform {

    transform(value: number, size: number): string {
        return value.toFixed(size);
    }

}
