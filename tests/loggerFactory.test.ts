import {describe, expect, test} from '@jest/globals';
import {getLogger, getLogLevel} from '../src/loggerFactory';

describe('loggerFactory', () => {
    test('should get the root logger', () => {
        const rootLogger = getLogger('root')
        expect(rootLogger).toBeDefined();
    });
    test('should get the root logger', () => {
        const level: string = getLogLevel('root')
        expect(level).toBe('info');
    });
});
