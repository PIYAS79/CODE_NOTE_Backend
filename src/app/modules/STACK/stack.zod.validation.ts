import { z } from "zod";



const Zod_Code_Stack_Type = z.object({
    body: z.object({
        from: z.string(),
        author: z.string(),
        code_id: z.string(),
    })
})

export {Zod_Code_Stack_Type};