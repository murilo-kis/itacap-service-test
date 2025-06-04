import {z} from 'zod';

// /**
//  * @openapi
//  * components:
//  *   schemas:
//  *     Center:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: The unique identifier for the center.
//  *         name:
//  *           type: string
//  *           description: The name of the center.
//  *         symbol:
//  *           type: string
//  *           description: The symbol or abbreviation for the center.
//             award_number:
//  *           type: string
//  *           nullable: true
//  *           description: The award number associated with the center (if any).
//  *         director_name:
//  *           type: string
//  *           nullable: true
//  *           description: The name of the center's director (if any).
//  *       required:
//  *         - id
//  *         - name
//  *         - symbol
//  */
export const CenterSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    symbol: z.string(),
    award_number: z.string(),
    director_name: z.string(),
});

export type Center = z.infer<typeof CenterSchema>;
