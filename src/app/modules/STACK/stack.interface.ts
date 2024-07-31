import { Types } from "mongoose"



export type Code_Stack_Type = {
    sender_pp: string,
    sender_name: string,
    author_pp: string,
    author_name: string,
    from: Types.ObjectId, // who send this req (user _id)
    author: Types.ObjectId, // main author of code (user _id)
    code_id: Types.ObjectId, // (code _id)
    reqAt?: Date,
}