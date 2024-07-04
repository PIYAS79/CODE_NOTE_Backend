import { Schema, model } from "mongoose";
import { User_Custom_Static_Method, User_Type } from "./user.interface";


export const User_Schema = new Schema<User_Type>({
    email : {
        type : String,
        unique:true,
        required : [true, "Provide your email *"]
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
    },
},{
    timestamps:true,
    toJSON:{
        virtuals:true,
    }
})



User_Schema.statics.isTokenValid = function(tokenIAt:number,PassUpAt:Date){
    const PassUpdatedAt = new Date(PassUpAt).getTime()/1000;
    return PassUpdatedAt>tokenIAt;
}


export const User_Model = model<User_Type,User_Custom_Static_Method>('User',User_Schema);