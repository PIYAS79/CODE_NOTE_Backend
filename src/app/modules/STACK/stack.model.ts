
import { Schema, model } from "mongoose";
import { Code_Stack_Type } from "./stack.interface";




const Stack_Schema = new Schema<Code_Stack_Type>({
    from: {
        type: Schema.Types.ObjectId,
        require: [true, "From is required *"]
    },
    author: {
        type: Schema.Types.ObjectId,
        require: [true, "To is required *"]
    },
    code_id: {
        type: Schema.Types.ObjectId,
        require: [true, "From is required *"]
    },
    author_name: {
        type: String,
        require: [true, "author name is required *"]
    },
    author_pp: {
        type: String,
    },
    sender_name: {
        type: String,
        require: [true, "author name is required *"]
    },
    sender_pp: {
        type: String,
    },
    reqAt: Date
}, {
    timestamps: true
})


export const Stack_Model = model<Code_Stack_Type>('Stack', Stack_Schema);