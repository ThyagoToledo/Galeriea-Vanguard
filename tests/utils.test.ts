import { describe, expect, it } from 'vitest';
import { cn } from '../lib/utils';

describe('cn utility', () => {
    it('merges class names and removes duplicates', () => {
        const result = cn('px-4 py-2', 'px-4', ['text-white', { hidden: false }]);
        expect(result).toBe('py-2 px-4 text-white');
    });
});
