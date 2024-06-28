import { Types } from "mongoose"
import { User_Name_Type, User_Type } from "../USER/user.interface"
import { User_Contact_Type } from "../../global/interfaces"



export type Teacher_Type = {
    user : Types.ObjectId,
    email:string,
    name : User_Name_Type,
    teacherId : string,
    department : string,
    skills? : string[],
    contact? : User_Contact_Type
    codes? : string[] 
}


// teacher type
export type Get_Teacher_Type = {
    user: User_Type,
    name: User_Name_Type,
    teacherId: string,
    department: string,
    skills?: string[],
    contact?: User_Contact_Type
    codes?: string[]
}