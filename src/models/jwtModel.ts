import {z} from 'zod';

export const JWTSchema = z.object({
    sub: z.string(),
    roles: z.array(z.string()),
    isAdmin: z.boolean(),
});

export type JWT = z.infer<typeof JWTSchema>;