import {describe, expect, test} from '@jest/globals';
import {getSICs} from "../src/service/referenceDataService";
import {SIC} from "../src/models/sicModel";
import {shutdownPools} from "../src/db";

describe('referenceService', () => {
    test('get SICs', async () => {
        const sics: SIC[] = await getSICs();
        expect(sics.length > 0).toBeTruthy()
    });
});

afterAll(async () => {
    await shutdownPools();
});
