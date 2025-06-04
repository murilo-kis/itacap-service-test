import {NextFunction, Request, Response, Router} from 'express';
import {getLogger} from '../loggerFactory';
import {Example} from "../models/exampleModel";
import {sayHello} from "../service/exampleService";

const log = getLogger('exampleRouter');

const router = Router();

/**
 * @openapi
 * /api/example:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Example endpoint.
 *     description: Says hello world!
 *     tags:
 *       - Example
 *     responses:
 *       200:
 *         description: Returns an example message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Example'
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        // req.log.info('something')
        log.info("Hello world!");
        const exampleModel: Example = sayHello()
        res.status(200).json(exampleModel);
    } catch (error) {
        next(error);
    }
});

export default router;
