import {getLogger} from '../loggerFactory';
import config from "../config";
import {Storage} from '@google-cloud/storage';

const STORAGE = new Storage();
const BUCKET = STORAGE.bucket(config.storageBucketName);

const log = getLogger('service.bucketService');

/**
 * Upload a file to Google Cloud Storage.
 * @param buffer - The file buffer to upload.
 * @param path - The path in the bucket where the file will be uploaded.
 * @param contentType - The content type of the file. Defaults to 'application/octet-stream'.
 */
const upload = (
    buffer: Buffer,
    path: string,
    contentType: string = 'application/octet-stream'
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const file = BUCKET.file(path);
        const writeStream = file.createWriteStream({
            resumable: false,
            metadata: {
                contentType,
            },
        });
        writeStream.on('error', (err) => {
            log.error(`Failed to upload file to path:[${path}]`, err);
            reject(err)
        });
        writeStream.on('finish', () => {
            log.info(`File successfully uploaded to path:[${path}].`);
            resolve()
        });
        writeStream.end(buffer);
    });
}

/**
 * Download a file from Google Cloud Storage.
 * @param path - The path in the bucket where the file is located.
 * @returns A promise that resolves to the file buffer.
 */
const download = async (path: string): Promise<Buffer> => {
    const file = BUCKET.file(path);
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        const readStream = file.createReadStream();
        readStream.on('error', (err) => {
            log.error(`Failed to download file from path:[${path}]`, err);
            reject(err);
        });
        readStream.on('data', (chunk) => {
            chunks.push(chunk);
        });
        readStream.on('end', () => {
            log.info(`File successfully downloaded from path:[${path}].`);
            resolve(Buffer.concat(chunks));
        });
    });
};

export {
    upload,
    download
}

