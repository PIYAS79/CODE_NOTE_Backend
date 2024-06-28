import { z } from 'zod';

// User_Name_Type schema
const Zod_User_Name_Schema = z.object({
    f_name: z.string(),
    m_name: z.string().optional(),
    l_name: z.string()
});

// User_Type schema
const Zod_User_Schema = z.object({
    email: z.string().email(),
    // status: z.enum(["ACTIVE", "BLOCK"]),
    role: z.enum(["STUDENT", "TEACHER", "ADMIN", "SUPER"]),
    // isDeleted: z.boolean(),
    userId: z.string(),
    password: z.string(),
    // passwordChangeAt: z.date().optional(),
    profileImage: z.string().optional(),
});

// User_Contact_Type schema
const Zod_User_Contact_Schema = z.object({
    studentProtal: z.string().optional(),
    telegram: z.string().optional(),
    github: z.string().optional(),
    stackOverflow: z.string().optional(),
    codeForces: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional()
});

export {Zod_User_Name_Schema,Zod_User_Schema,Zod_User_Contact_Schema}