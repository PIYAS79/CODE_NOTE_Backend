import { Model } from "mongoose"

// user type 
export type User_Name_Type = {
    f_name: string,
    m_name?: string,
    l_name: string
}
// user type
export type User_Type = {
    email: string,
    status: "ACTIVE" | "BLOCK",
    role: "STUDENT" | "TEACHER" | "ADMIN" | "SUPER",
    password: string,
    passwordChangeAt?: Date,
    profileImage?: string,
}



export interface User_Custom_Static_Method extends Model<User_Type>{
    isTokenValid(tokenIAt:number,PassUpAt:Date):boolean
}