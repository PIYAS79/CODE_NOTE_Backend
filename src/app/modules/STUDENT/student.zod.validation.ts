import { z } from 'zod';
import { Zod_User_Contact_Schema, Zod_User_Name_Schema, Zod_User_Schema } from '../USER/user.zod.validation';


const Get_Student_Schema = z.object({
    body: z.object({
        user: Zod_User_Schema,
        name: Zod_User_Name_Schema,
        studentId: z.string(),
        department: z.string(),
    })
});


const Zod_UPDATE_Student_Schema = z.object({
    body: z.object({
        user: Zod_User_Schema.optional(),
        name: Zod_User_Name_Schema.optional(),
        studentId: z.string().optional(),
        department: z.string().optional(),
        skills: z.array(z.string()).optional(),
        contact: Zod_User_Contact_Schema.optional(),
    })
});

export { Get_Student_Schema,Zod_UPDATE_Student_Schema };