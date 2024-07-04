import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Code_Stack_Type } from "./stack.interface";
import { Code_Model } from "../CODE/code.model";
import { Stack_Model } from "./stack.model";
import { Decode_Token } from "../../utils/jwt.operation";
import { JwtPayload } from "jsonwebtoken";



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
        author: gettedData.author,
        code_id: gettedData.code_id,
        from: gettedData.from,
        reqAt: new Date
    }

    const data = await Stack_Model.create(newCode);
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

    const result = await Stack_Model.findByIdAndDelete({_id:sid});
    return result;
}

const Get_My_All_Requests_Service=async(ruid:string,token:string)=>{
    // check if the user is exist or not 
    const user = await User_Model.findById({_id:ruid});
    if(!user){
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // decode token 
    const { email, role } = Decode_Token(token) as JwtPayload;
    // check the user.email and token user.email
    if(user.email !== email){
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *");
    }
    //send data
    const data = await Stack_Model.find({from:ruid});
    return data;
}



export const Stack_Services = {
    Create_Code_Req_Service,
    Cancel_Code_Req_Service,
    Get_My_All_Requests_Service
}