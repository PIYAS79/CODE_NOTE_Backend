import { Schema, Types, model } from "mongoose"
import { User_Schema } from "../USER/user.model"
import { Code_Schema, User_Contact_Schema, User_Name_Schema } from "../../global/schemas"
import { Teacher_Type } from "./teacher.interface"



const TeacherSchema = new Schema<Teacher_Type>({
    user : {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    email : {
        type : String,
        unique:true,
        required : [true, "Provide your email *"]
    },
    name : User_Name_Schema,
    teacherId : {
        type : String,
        required : [true, "Provide your Teacher ID *"]
    },
    department : {
        type : String,
        required : [true, "Provide your Department Name *"]
    },
    skills : [String],
    contact : User_Contact_Schema,
    codes : [Code_Schema] 
})

export const Teacher_Model = model<Teacher_Type>("Teacher",TeacherSchema);