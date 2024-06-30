import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Code_Type } from "./code.interface";
import { Code_Model } from "./code.model";
import { JwtPayload } from "jsonwebtoken";


const Create_Code_Service = async (gettedData: Code_Type) => {
    const uid = gettedData.author;
    const isUserExist = await User_Model.findById({ _id: uid });
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found !");
    }
    const result = await Code_Model.create(gettedData);
    return result;
}
const Get_All_Code_Service = async () => {
    const result = await Code_Model.find();
    return result;
}
const Get_Single_Code_Service = async (cid: string) => {
    const result = await Code_Model.find({ _id: cid });
    return result;
}
const Get_User_Codes_Service = async (uid: string) => {
    const isUserExist = await User_Model.findById({ _id: uid });
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found !");
    }
    const result = await Code_Model.find({ author: uid });
    return result;
}
const Update_Code_Service = async (cid: string, gettedData: Partial<Code_Type>, tokenData: JwtPayload) => {

    // find the code through cid
    const code = await Code_Model.findOne({ _id: cid });
    if (!code) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Code not found *")
    }
    // find the user through token.email
    const user = await User_Model.findOne({ email: tokenData.email });
    // if this user _id is not matched with the gettedData author, (means you got any other token but the code is not the exact person)
    if ((code?.author)?.toString() !== (user?._id)?.toString()) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *")
    }
    const remainingProperties: Record<string, unknown> = {
        ...gettedData
    }
    const result = await Code_Model.findByIdAndUpdate({ _id: cid }, remainingProperties, { new: true });
    return result;
}
const Delete_Code_Service = async (cid: string, tokenData: JwtPayload) => {

    // find the code through cid
    const code = await Code_Model.findOne({ _id: cid });
    if (!code) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Code not found *")
    }
    // find the user through token.email
    const user = await User_Model.findOne({ email: tokenData.email });
    // if this user _id is not matched with the gettedData author
    if ((code?.author)?.toString() !== (user?._id)?.toString()) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *")
    }

    const result = await Code_Model.findByIdAndDelete({_id:cid});
    return result;
}


export const Code_Services = {
    Create_Code_Service,
    Get_All_Code_Service,
    Get_Single_Code_Service,
    Get_User_Codes_Service,
    Update_Code_Service,
    Delete_Code_Service
}