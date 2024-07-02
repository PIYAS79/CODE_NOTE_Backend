
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
    isAccept:{
        type: String,
        enum:{
            values:['Y','P','N'],
            message:'{VALUE} is not assignable to types "Y", "P", "N"'
        },
        default:'P'
    },
    reqAt: Date
})


export const Stack_Model = model<Code_Stack_Type>('Stack',Stack_Schema);