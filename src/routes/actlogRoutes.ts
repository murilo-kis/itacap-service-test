import {NextFunction, Request, Response, Router} from "express";
import {ActlogWeb} from "../models/actlogModel";
import {getActlogReportDetails, getActlogsForCenterWeb, getActlogWeb, updateActlog} from "../service/actlogService";
import {ActlogReport} from "../models/actlogReport";
import multer from "multer";
import {ServiceError} from "../models/serviceError";
import {uploadActlogPdf} from "../service/uploadService";

const router = Router();

/**
 * @openapi
 * /api/itacap/actlog/{centerAbbreviation}/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get activity logs
 *     description: Retrieves a list of all the Actlogs for a center.
 *     tags:
 *       - Core
 *       - Actlog
 *     parameters:
 *       - in: path
 *         name: centerAbbreviation
 *         schema:
 *           type: string
 *           description: The two letter abbreviation for the center the actlogs belong to.
 *     responses:
 *       200:
 *         description: A JSON array containing all the actlogs for a given center.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Not authenticated.
 */
router.get('/:centerAbbreviation/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const centerAbbreviation = req.params.centerAbbreviation;
        const actLogs: ActlogWeb[] = await getActlogsForCenterWeb(centerAbbreviation);
        res.status(200).json(actLogs);
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /api/itacap/actlog/{reportId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a single activity log
 *     description: Get a single activity log using it's reportId
 *     tags:
 *       - Core
 *       - Actlog
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *           description: The string representing the reportId for the actlog.
 *     responses:
 *       200:
 *         description: A JSON of a specified actlog
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Actlog not found.
 *         content: null
 *       401:
 *         description: Not authenticated.
 */
router.get('/:reportId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportId = req.params.reportId;
        const actLog: ActlogWeb | null = await getActlogWeb(reportId);

        if (!actLog) {
            res.status(404).json({message: 'Actlog not found!'});
            return;
        }

        res.status(200).json(actLog);
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /api/itacap/actlog:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Save an activity log
 *     description: Saves an activity log.
 *     tags:
 *       - Core
 *       - Actlog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActlogWeb'
 *     responses:
 *       200:
 *         description: A JSON of a specified actlog
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Actlog not found.
 *         content: null
 *       401:
 *         description: Not authenticated.
 */
router.put('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body) {
            res.status(400).json({message: 'No body in put request!'});
            return;
        }
        const savedActlog = await updateActlog(body as ActlogWeb);

        res.status(200).json(savedActlog);
    } catch (error) {
        next(error);
    }
});

/**
 * @openapi
 * /api/itacap/actlog/{assignedId}/report:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all the details for the Report Screen of an Actlog
 *     tags:
 *       - Core
 *       - Actlog
 *     parameters:
 *       - in: path
 *         name: assignedId
 *         schema:
 *           type: string
 *           description: The string representing the ID for the actlog.
 *     responses:
 *       200:
 *         description: A JSON of a specified actlog report
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Actlog not found.
 *         content: null
 *       401:
 *         description: Not authenticated.
 */
router.get('/:assignedId/report', async (req: Request, res: Response, next: NextFunction) => {
    const assignedId = req.params.assignedId;
    const report: ActlogReport | null = await getActlogReportDetails(assignedId);
    res.status(200).json(report);
})

/**
 * @openapi
 * /api/itacap/actlog/{assignedId}/pdf:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Upload a PDF for this actlog
 *     tags:
 *       - Core
 *       - Actlog
 *     parameters:
 *       - in: path
 *         name: assignedId
 *         schema:
 *           type: string
 *           description: The string representing the ID for the actlog.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The PDF file to upload
 *     responses:
 *       200:
 *         description: A JSON of a specified actlog report
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Actlog not found.
 *         content: null
 *       401:
 *         description: Not authenticated.
 */
router.post('/:assignedId/pdf', uploadActlogPdf);

export default router;