import {describe, expect, test} from '@jest/globals';
import {sayHello} from "../src/service/exampleService";

describe('exampleService', () => {
    test('should return message', () => {
        const exampleModel = sayHello();
        expect(exampleModel).toBeDefined()
        expect(exampleModel.msg).toBe("hello world!");
    });
});
