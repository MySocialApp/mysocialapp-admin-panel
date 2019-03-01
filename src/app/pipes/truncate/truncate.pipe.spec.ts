import {TruncateDecimalPipe} from './truncate-decimal.pipe';

describe('TruncateDecimalPipe', () => {
    it('create an instance', () => {
        const pipe = new TruncateDecimalPipe();
        expect(pipe).toBeTruthy();
    });
});
