import { Types } from "mongoose"
import { User_Name_Type, User_Type } from "../USER/user.interface"
import { User_Contact_Type } from "../../global/interfaces"



export type Student_Type = {
    user : Types.ObjectId,
    email:string,
    name : User_Name_Type,
    studentId : string,
    department : string,
    skills? : string[],
    contact? : User_Contact_Type
}


// get student type
export type Get_Student_Type = {
    user: User_Type,
    name: User_Name_Type,
    studentId: string,
    department: string,
    skills?: string[],
    contact?: User_Contact_Type
}