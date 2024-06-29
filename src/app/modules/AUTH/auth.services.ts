import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Create_Token_Data_Type } from "./auth.interface";
import { Decrypt_Password } from "../../utils/bcrypt.operation";
import { Create_JWT_Token, Decode_Token } from "../../utils/jwt.operation";
import { JwtPayload } from "jsonwebtoken";



const Auth_Login_Service = async(gettedData:Create_Token_Data_Type)=>{

    const isUserExist = await User_Model.findOne({userId:gettedData.userId});
    if(!isUserExist){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"User Not Found !");
    }
    const isPasswordMatch = await Decrypt_Password(gettedData.password,isUserExist.password);
    if(!isPasswordMatch){
        throw new Final_App_Error(httpStatus.FORBIDDEN,"Forbidded User")
    }

    const AccessToken = Create_JWT_Token({
        role:isUserExist.role,
        userId:isUserExist.userId
    },'1hr')
    const RefreshToken = Create_JWT_Token({
        role:isUserExist.role,
        userId:isUserExist.userId
    },'10d')

    return {AccessToken,RefreshToken};
}



const Refresh_Token_Service = async(token:string)=>{
    const decodedData = Decode_Token(token) as JwtPayload;
    const isUserExist = await User_Model.findOne({userId:decodedData.userId});
    if(!isUserExist){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"User Not Found !");
    }
    const AccessToken = Create_JWT_Token({
        role:isUserExist.role,
        userId:isUserExist.userId
    },'1hr')

    return {AccessToken}
}

export const Auth_Services = {
    Auth_Login_Service,
    Refresh_Token_Service
}