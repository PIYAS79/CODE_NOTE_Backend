import { Schema, model } from "mongoose";
import { Code_Type } from "./code.interface";


export const Code_Schema = new Schema<Code_Type>({
    title: {
        type: String,
        required: [true, "Code title is required *"]
    },
    courseCode: {
        type: String,
    },
    language:{
        type:String,
        required:[true,"Language is required *"]
    },
    code: {
        type: String,
        required: [true, "give some codes *"]
    },
    isStar: {
        type: Boolean,
    },
    author: {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
})



export const Code_Model = model<Code_Type>('Code',Code_Schema);