import { Types } from "mongoose"
import { Code_Type, User_Contact_Type, User_Name_Type } from "../USER/user.interface"



export type Teacher_Type = {
    user : Types.ObjectId,
    name : User_Name_Type,
    teacherId : string,
    department : string,
    skills? : string[],
    contact? : User_Contact_Type
    codes? : string[] 
}