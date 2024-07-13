import { z } from 'zod';

export const Zod_Code_Schema = z.object({
    body: z.object({
        title: z.string(),
        courseCode: z.string().optional(),
        code: z.string(),
        isStar: z.boolean().optional(),
        author: z.string() // Types.ObjectId is represented as a string
    })
});

export const Zod_Update_Code_Schema = z.object({
    body: z.object({
        title: z.string().optional(),
        courseCode: z.string().optional(),
        code: z.string().optional(),
        isStar: z.boolean().optional(),
        author: z.string().optional() // Types.ObjectId is represented as a string
    })
});

