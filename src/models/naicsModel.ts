import {z} from 'zod';

export const NAICSSchema = z.object({
    code: z.string(),
    title: z.string(),
    description: z.string(),
});

export type NAICS = z.infer<typeof NAICSSchema>;
