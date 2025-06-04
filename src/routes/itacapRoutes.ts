import {NextFunction, Request, Response, Router} from 'express';
import {getRefData} from "../service/referenceDataService";
import {getCenters} from "../repo/centerRepo";

const router = Router();

/**
 * @openapi
 * /api/itacap/centers:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all centers
 *     description: Retrieves a list of all centers. Supports optional cache reloading via the 'reload' query parameter.
 *     tags:
 *       - Core
 *     parameters:
 *       - in: query
 *         name: reload
 *         schema:
 *           type: boolean
 *           description: Optional. If true, forces a fresh load of centers from the database and updates the cache. Defaults to false (uses cached data if available).
 *     responses:
 *       200:
 *         description: A JSON array containing the list of centers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Center'
 *       500:
 *         description: Internal server error.
 *       401:
 *          description: Not authenticated.
 *       403:
 *          description: Access token does not have the required scope.
 */
router.get('/centers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reloadParam = req.query.reload;
        const reload = reloadParam === 'true';
        const centers = await getCenters(reload);
        res.status(200).json(centers);
    } catch (error) {
        next(error);
    }
});


/**
 * @openapi
 * /api/itacap/refData:
 *   get:
 *     summary: Get all reference data
 *     description: Retrieves all reference date to facilitate code lookups. Supports optional cache reloading via the 'reload' query parameter.
 *     tags:
 *       - Core
 *     parameters:
 *       - in: query
 *         name: reload
 *         schema:
 *           type: boolean
 *           description: Optional. If true, forces a fresh load of centers from the database and updates the cache. Defaults to false (uses cached data if available).
 *     responses:
 *       200:
 *         description: A JSON object containing reference maps by name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Internal server error.
 *       401:
 *          description: Not authenticated.
 *       403:
 *          description: Access token does not have the required scope.
 */
router.get('/refData', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reloadParam = req.query.reload;
        const reload = reloadParam === 'true';
        const centers = await getRefData(reload);
        res.status(200).json(centers);
    } catch (error) {
        next(error);
    }
});


export default router;
