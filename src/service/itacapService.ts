import {getLogger} from '../loggerFactory';
import {download, upload} from "./bucketService";

const ASSESSMENTS = `assessments`;
const IMPLEMENTATION_SURVEYS = `implementation-surveys`;

const log = getLogger('service.itacapService');

/**
 * Uploads a PDF assessment file to the specified path in the bucket.
 * @param file - The PDF file as a Buffer.
 * @param centerAbbreviation - The abbreviation of the center.
 * @param key - The key for the assessment file.
 */
const uploadAssessmentPDF =
    async (file: Buffer, centerAbbreviation: string, key: string): Promise<void> => {
        const filePath = `${ASSESSMENTS}/${centerAbbreviation}/${key}.pdf`;
        await upload(file, filePath, 'application/pdf');
        log.info(`Uploaded assessment to path:[${filePath}]`);
    }

/**
 * Downloads a PDF assessment file from the specified key in the bucket.
 * @param centerAbbreviation
 * @param key
 */
const downloadAssessmentPDF =
    async (centerAbbreviation: string, key: string): Promise<Buffer> => {
        const filePath = `${ASSESSMENTS}/${centerAbbreviation}/${key}.pdf`;
        const buff: Buffer = await download(filePath);
        log.info(`Downloaded assessment from path:[${filePath}]`);
        return buff;
    }

/**
 * Uploads a PDF implementation survey file to the specified key in the bucket.
 * @param file - The PDF file as a Buffer.
 * @param centerAbbreviation - The abbreviation of the center.
 * @param key - The key where the file will be uploaded.
 */
const uploadImplementationSurveyPDF =
    async (file: Buffer, centerAbbreviation: string, key: string): Promise<void> => {
        const filePath = `${IMPLEMENTATION_SURVEYS}/${centerAbbreviation}/${key}.pdf`;
        await upload(file, filePath, 'application/pdf');
        log.info(`Uploaded implementation survey to path:[${filePath}]`);
    }

/**
 * Downloads a PDF implementation survey file from the specified key in the bucket.
 * @param centerAbbreviation
 * @param key
 */
const downloadImplementationSurveyPDF =
    async (centerAbbreviation: string, key: string): Promise<Buffer> => {
        const filePath = `${IMPLEMENTATION_SURVEYS}/${centerAbbreviation}/${key}.pdf`;
        const buff: Buffer = await download(filePath);
        log.info(`Downloaded implementation survey from path:[${filePath}]`);
        return buff;
    }

export {
    uploadAssessmentPDF,
    downloadAssessmentPDF,
    uploadImplementationSurveyPDF,
    downloadImplementationSurveyPDF,
}