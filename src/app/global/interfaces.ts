
// universal type

import { Role_Types } from "./global.constant"

// universal type
export type User_Contact_Type = {
    studentProtal?: string,
    telegram?: string,
    github?: string,
    stackOverflow?: string,
    codeForces?: string,
    phone?: string
    address?: string
}


export type User_Role_Types = "STUDENT" | "TEACHER" | "ADMIN" | "SUPER";