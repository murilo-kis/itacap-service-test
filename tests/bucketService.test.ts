import {describe, test} from '@jest/globals';
import {download, upload} from "../src/service/bucketService";
import * as fs from 'fs/promises';
import * as path from "node:path";
import mime from 'mime-types';

describe('bucketService', () => {

    const filePath = 'tests/resources/test.md';
    const fileName = path.basename(filePath);
    const gcsPath = `test/${fileName}`;

    test('should upload and download the test file', async () => {
        const buffer: Buffer = await fs.readFile(filePath, {encoding: null});
        const contentType = mime.lookup(filePath) || 'application/octet-stream';
        await upload(buffer, gcsPath, contentType as string);
        const downloadedBuffer = await download(gcsPath);
        expect(downloadedBuffer.equals(buffer)).toBe(true);
    });

});
