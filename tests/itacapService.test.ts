import {describe, expect, test} from '@jest/globals';
import {shutdownPools} from "../src/db";
import {Center} from "../src/models/centerModel";
import {ActlogWeb} from "../src/models/actlogModel";
import {
    downloadAssessmentPDF,
    downloadImplementationSurveyPDF,
    getCenters,
    uploadAssessmentPDF,
    uploadImplementationSurveyPDF
} from "../src/service/itacapService";
import {getActlogsForCenterWeb} from "../src/service/actlogService";
import fs from "fs/promises";

describe('itacapService', () => {
    test('should get centers', async () => {
        const centers: Center[] = await getCenters()
        expect(centers.length).toBeGreaterThan(0);
    });
    test('should get activity logs for center', async () => {
        const activityLogs: ActlogWeb[] = await getActlogsForCenterWeb('TC');
        expect(activityLogs.length).toBeGreaterThan(0);
        const actLog: ActlogWeb = activityLogs[0];
        expect(actLog.sicCd === 1).toBeTruthy();
    });

    const CENTER_ABBREVIATION = 'XX';

    test('should upload test assessment', async () => {
        const buffer: Buffer =
            await fs.readFile('tests/resources/test-assessment.pdf', {encoding: null});
        await uploadAssessmentPDF(buffer, CENTER_ABBREVIATION, 'test-assessment');
    });
    test('should download test assessment', async () => {
        const downloadedBuffer =
            await downloadAssessmentPDF(CENTER_ABBREVIATION, 'test-assessment');
        expect(downloadedBuffer).toBeDefined();
    });
    test('should upload test implementation survey',
        async () => {
            const buffer: Buffer = await fs.readFile('tests/resources/test-implementation-survey.pdf', {encoding: null});
            await uploadImplementationSurveyPDF(buffer, CENTER_ABBREVIATION, 'test-implementation-survey');
        });
    test('should download test implementation survey', async () => {
        const downloadedBuffer =
            await downloadImplementationSurveyPDF(CENTER_ABBREVIATION, 'test-implementation-survey');
        expect(downloadedBuffer).toBeDefined();
    });
});

afterAll(async () => {
    await shutdownPools();
});
