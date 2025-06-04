import {z} from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         type:
 *           type: integer
 *           description: The type of user (e.g., admin, regular).
 *       required:
 *         - id
 *         - email
 *         - user_type
 */
export const UserSchema = z.object({
    id: z.number().int(),
    username: z.string(),
    type: z.number().int(),
});

export type User = z.infer<typeof UserSchema>;