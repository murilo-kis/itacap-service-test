import {z} from 'zod';

export const SICSchema = z.object({
    code: z.string(),
    office: z.string(),
    industry_title: z.string(),
});

export type SIC = z.infer<typeof SICSchema>;
