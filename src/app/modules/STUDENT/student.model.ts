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


// userSchema.virtual('domain').get(function() {
//     return this.email.slice(this.email.indexOf('@') + 1);
//   });

Student_Schema.virtual('fullName').get(function(){
    if(this.name.m_name){
        return `${this.name.f_name} ${this.name.m_name} ${this.name.l_name}`
    }else{
        return `${this.name.f_name} ${this.name.l_name}`
    }
})



export const Student_Model = model<Student_Type>("Student",Student_Schema);
