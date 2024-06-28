import { Schema, model } from "mongoose";
import { User_Type } from "./user.interface";


const User_Schema = new Schema<User_Type>({
    email : {
        type : String,
        required : [true, "Provide your email *"]
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
    passwordChangeAt :{
        type : Date,
    },
    status : {
        type : String,
        enum : {
            values : ["ACTIVE", "BLOCK"],
        },
        default : "ACTIVE"
    },
    role : {
        type : String,
        enum : {
            values : ["STUDENT", "TEACHER", "ADMIN", "SUPER"],
            message :'{VALUE} is not assignable to types "STUDENT", "TEACHER", "ADMIN", "SUPER"'
        },
        required:[true,"You should select the role *"]
    },
    userId : {
        type : String,
        required : [true, "Provide your user id *"]
    }, 
    password : {
        type : String,
        required : [true, "Provide a strong user password *"]
    }, 
    profileImage : {
        type : String,
    }
})


export const User_Model = model<User_Type>('User',User_Schema);