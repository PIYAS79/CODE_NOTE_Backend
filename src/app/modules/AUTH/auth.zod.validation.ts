import {z} from 'zod';

export const Zod_Create_Token_Data_Type = z.object({
    body:z.object({
        password:z.string(),
        userId:z.string()
    })
})

