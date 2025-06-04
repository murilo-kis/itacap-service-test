import {z} from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Example:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Message.
 *       required:
 *         - msg
 */
export const ExampleSchema = z.object({
    msg: z.string(),
});

export type Example = z.infer<typeof ExampleSchema>;


