import { Schema, model } from "mongoose"
import { User_Contact_Schema, User_Name_Schema } from "../../global/schemas"
import { Student_Type } from "./student.interface";



const Student_Schema = new Schema<Student_Type>({
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
    studentId : {
        type : String,
        required : [true, "Provide your Teacher ID *"]
    },
    department : {
        type : String,
        required : [true, "Provide your Department Name *"]
    },
    skills : [String],
    contact : User_Contact_Schema,
},{
    timestamps:true,
    toJSON:{
        virtuals:true,
    }
})

export const Student_Model = model<Student_Type>("Student",Student_Schema);
