import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Code_Model } from "../CODE/code.model";
import { Stack_Model } from "./stack.model";
import { Decode_Token } from "../../utils/jwt.operation";
import { JwtPayload } from "jsonwebtoken";
import { SendEmail } from "../../utils/nodeMailer";
import { Code_Type } from "../CODE/code.interface";
import mongoose from "mongoose";
import { find_Code_Author_Name } from "../../utils/findAuthorName";
import { User_Type } from "../USER/user.interface";
import { Code_Stack_Type } from "./stack.interface";




const Create_Code_Req_Service = async (gettedData: Code_Stack_Type) => {
    const isUserExist = await User_Model.findById({ _id: gettedData.author });
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    const isCodeExist = await Code_Model.findById({ _id: gettedData.code_id });
    if (!isCodeExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Code not found *");
    }
    if ((isCodeExist.author).toString() !== (isUserExist._id).toString()) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *");
    }

    const isThisReqExist = await Stack_Model.findOne({
        author: gettedData.author,
        code_id: gettedData.code_id,
        from: gettedData.from,
    })
    if (isThisReqExist) {
        throw new Final_App_Error(httpStatus.CONFLICT, "Already Requested !")
    }

    const newCode: Code_Stack_Type = {
        sender_name: gettedData.sender_name,
        sender_pp: gettedData.sender_pp,
        author_name: gettedData.author_name,
        author_pp: gettedData.author_pp,
        author: gettedData.author,
        code_id: gettedData.code_id,
        from: gettedData.from,
        reqAt: new Date
    }
    const data = await Stack_Model.create(newCode);

    let authorName = find_Code_Author_Name(isUserExist.role, isUserExist.email) || 'Default';
    const html = `<h1>Recently you have code request ! </h1><br><p>someone request for your code ! <a href="www.google.com">go to check profile</a></p>`
    const subject = "CODE_NOTE : Code Request"
    // SendEmail((isUserExist.email).toString(),html,subject);
    return data;
}
const Cancel_Code_Req_Service = async (sid: string, token: string) => {
    const isRequstExist: Code_Stack_Type | null = await Stack_Model.findById({ _id: sid });
    if (!isRequstExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Req not found *");
    }
    const { email, role } = Decode_Token(token) as JwtPayload;
    const isUserMatch = await User_Model.findOne({ email: email });
    if (!isUserMatch) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Author not found *");
    }
    if ((isRequstExist?.from).toString() !== (isUserMatch._id).toString()) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *")
    }

    const result = await Stack_Model.findByIdAndDelete({ _id: sid });
    return result;
}
const Get_My_All_Requests_Service = async (ruid: string, token: string) => {
    // check if the user is exist or not 
    const user = await User_Model.findById({ _id: ruid }) as User_Type;
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // decode token 
    const { email, role } = Decode_Token(token) as JwtPayload;
    // check the user.email and token user.email
    if (user.email !== email) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *");
    }
    //send data
    const data = await Stack_Model.find({ from: ruid });
    return { data };
}
const Get_My_All_Ask_Service = async (id: string, token: string) => {
    // check if the user is exist or not 
    const user = await User_Model.findById({ _id: id });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // decode token 
    const { email, role } = Decode_Token(token) as JwtPayload;
    // check the user.email and token user.email
    if (user.email !== email) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *");
    }
    //send data
    const data = await Stack_Model.find({ author: id });
    return data;
}
const Ask_Decision_Req_Service = async (sid: string, token: string, gettedData: { status: boolean }) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction();

        const isStackExist = await Stack_Model.findById({ _id: sid });
        // check if the code is exist or not by stack _id
        if (!isStackExist) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "Stack code not found *")
        }
        // check if who req for the code is he exist or not ?
        const requester = await User_Model.findById({ _id: isStackExist.from });
        if (!requester) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "Requester not found *");
        }
        // decode token 
        const { email, role } = Decode_Token(token) as JwtPayload;
        // check if the user is exist or not 
        const user = await User_Model.findOne({ email: email });
        if (!user) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
        }
        // check if the user _id and the stack code author is same or not 
        if ((user._id).toString() !== (isStackExist.author).toString()) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *");
        }

        if (!gettedData.status) {
            // req unaccepted 
            // lets delete the req
            let result = await Stack_Model.findByIdAndDelete({_id:sid});
            return result;
        }

        // req accepted
        const code = await Code_Model.findById({ _id: isStackExist.code_id });
        if (!code) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "May be code is deleted by the author")
        }
        // push code to requeter collection
        const newCode: Code_Type = {
            title: code.title,
            courseCode: code.courseCode,
            language: code.language,
            code: code.code,
            isStar: false,
            author: isStackExist.from

        }
        await Code_Model.create(newCode);
        let result = await Stack_Model.findByIdAndDelete({_id:sid});
        // send email to reqester
        let authorName = await find_Code_Author_Name(user.role, user.email);
        const html = `<h1>Your Code Request : Accepted by ${authorName}</h1><br><p>Code Author : ${authorName}</p><br><p>You create this request at : ${isStackExist.reqAt}</p>`
        const subject = "Your code request is accept by code author 🔥"
        await SendEmail((requester.email).toString(), html, subject);

        await session.commitTransaction();
        await session.endSession();

        return result
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession()
        throw err;
    }
}

export const Stack_Services = {
    Create_Code_Req_Service,
    Cancel_Code_Req_Service,
    Get_My_All_Requests_Service,
    Get_My_All_Ask_Service,
    Ask_Decision_Req_Service
}