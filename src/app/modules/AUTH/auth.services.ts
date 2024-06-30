import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Change_Password_Data_Type, Create_Token_Data_Type } from "./auth.interface";
import { Decrypt_Password, Encrypt_Password } from "../../utils/bcrypt.operation";
import { Create_JWT_Token, Decode_Token } from "../../utils/jwt.operation";
import { JwtPayload } from "jsonwebtoken";



const Auth_Login_Service = async (gettedData: Create_Token_Data_Type) => {

    const isUserExist = await User_Model.findOne({ email: gettedData.email });
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Email or Password is incorrect !");
    }
    const isPasswordMatch = await Decrypt_Password(gettedData.password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Email or Password is incorrect !");
    }

    const AccessToken = Create_JWT_Token({
        role: isUserExist.role,
        email: isUserExist.email
    }, '1hr')
    const RefreshToken = Create_JWT_Token({
        role: isUserExist.role,
        email: isUserExist.email
    }, '10d')

    return { AccessToken, RefreshToken };
}

const Refresh_Token_Service = async (token: string) => {
    const decodedData = Decode_Token(token) as JwtPayload;
    const isUserExist = await User_Model.findOne({ email: decodedData.email });
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found !");
    }
    const AccessToken = Create_JWT_Token({
        role: isUserExist.role,
        email: isUserExist.email
    }, '1hr')

    return { AccessToken }
}

const Change_Password_Service =async (gettedData:Change_Password_Data_Type,token:string) => {

    // decode token data
    const decodedTokenData = Decode_Token(token) as JwtPayload;
    // get user from the token data (email)
    const user = await User_Model.findOne({email:decodedTokenData.email});
    if(!user){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"User not found *");
    }
    // compair getted old password with the user password  
    const isPasswordMatch = await Decrypt_Password(gettedData.oldPassword,user.password);
    if(!isPasswordMatch){
        throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Unauthorized Access *");
    }

    const encryptNewPassword = await Encrypt_Password(gettedData.newPassword);
    const result = await User_Model.findByIdAndUpdate({_id:user._id},{
        password:encryptNewPassword,
        passwordChangeAt: new Date
    },{new:true}) 

    return result;
}

export const Auth_Services = {
    Auth_Login_Service,
    Refresh_Token_Service,
    Change_Password_Service
}