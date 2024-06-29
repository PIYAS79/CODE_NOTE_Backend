import { Types } from "mongoose"



export type Code_Type = {
    title: string,
    courseCode?: string,
    language?: string,
    code: string,
    isStar?: boolean,
    author: Types.ObjectId
}
