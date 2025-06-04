import {NextFunction, Request, Response, Router} from 'express';
import {login} from "../service/authService";

const router = Router();
/**
 * @openapi
 * /auth/login:
 *   post:
 *    summary: User login.
 *    description: Authenticates a user and returns a JWT token.
 *    tags:
 *    - Authentication
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - username
 *              - password
 *    responses:
 *     200:
 *       description: Returns a JWT token.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The JWT token for the authenticated user.
 */
// @ts-ignore
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const token = await login(username, password)
        if (!token) {
            return res.status(401).json({message: 'Login failed!'});
        }
        res.status(200).json({token});
    } catch (error) {
        next(error);
    }
});

export default router;