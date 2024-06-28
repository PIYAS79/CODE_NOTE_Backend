import { z } from 'zod';
import { Zod_User_Contact_Schema, Zod_User_Name_Schema, Zod_User_Schema } from '../USER/user.zod.validation';


const Get_Teacher_Schema = z.object({
    body: z.object({
        user: Zod_User_Schema,
        name: Zod_User_Name_Schema,
        teacherId: z.string(),
        department: z.string(),
    })
});


const Zod_UPDATE_Teacher_Schema = z.object({
    body: z.object({
        user: Zod_User_Schema.optional(),
        name: Zod_User_Name_Schema.optional(),
        teacherId: z.string().optional(),
        department: z.string().optional(),
        skills: z.array(z.string()).optional(),
        contact: Zod_User_Contact_Schema.optional(),
    })
});

export { Get_Teacher_Schema,Zod_UPDATE_Teacher_Schema };