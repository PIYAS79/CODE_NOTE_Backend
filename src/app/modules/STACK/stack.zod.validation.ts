import { z } from "zod";



const Zod_Code_Stack_Type = z.object({
    body: z.object({
        from: z.string(),
        author: z.string(),
        code_id: z.string(),
        author_name: z.string(),
        author_pp: z.string(),
        sender_name: z.string(),
        sender_pp: z.string()
    })
})


const Zod_Ask_Status_Type = z.object({
    body: z.object({
        status: z.boolean()
    })
})

export { Zod_Code_Stack_Type, Zod_Ask_Status_Type };