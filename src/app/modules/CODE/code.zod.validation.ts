import { z } from 'zod';

export const Zod_Code_Schema = z.object({
    body: z.object({
        title: z.string(),
        courseCode: z.string().optional(),
        language: z.string().optional(),
        code: z.string(),
        isStar: z.boolean().optional(),
        author: z.string() // Types.ObjectId is represented as a string
    })
});

