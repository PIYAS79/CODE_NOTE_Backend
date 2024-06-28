import { z } from 'zod';
import { Zod_User_Contact_Schema, Zod_User_Name_Schema, Zod_User_Schema } from '../USER/user.zod.validation';


const Get_Teacher_Schema = z.object({
    body: z.object({
        user: Zod_User_Schema,
        name: Zod_User_Name_Schema,
        teacherId: z.string(),
        department: z.string(),
        // skills: z.array(z.string()).optional(),
        // contact: Zod_User_Contact_Schema.optional(),
        // codes: z.array(z.string()).optional()
    })
});

export { Get_Teacher_Schema };