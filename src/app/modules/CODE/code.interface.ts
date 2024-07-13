import { Types } from "mongoose"



export type Code_Type = {
    title: string,
    courseCode?: string,
    code: string,
    isStar?: boolean,
    author: Types.ObjectId  //user model _id
}
