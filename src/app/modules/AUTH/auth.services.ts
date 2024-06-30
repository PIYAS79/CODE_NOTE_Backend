import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Change_Password_Data_Type, Create_Token_Data_Type, Reset_Password_Type } from "./auth.interface";
import { Decrypt_Password, Encrypt_Password } from "../../utils/bcrypt.operation";
import { Create_JWT_Token, Decode_Token } from "../../utils/jwt.operation";
import { JwtPayload } from "jsonwebtoken";
import { SendEmail } from "../../utils/nodeMailer";
import config from "../../config";



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
    const user = isUserExist
    return { AccessToken, RefreshToken, user };
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

const Change_Password_Service = async (gettedData: Change_Password_Data_Type, token: string) => {

    // decode token data
    const decodedTokenData = Decode_Token(token) as JwtPayload;
    // get user from the token data (email)
    const user = await User_Model.findOne({ email: decodedTokenData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // compair getted old password with the user password  
    const isPasswordMatch = await Decrypt_Password(gettedData.oldPassword, user.password);
    if (!isPasswordMatch) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *");
    }

    const encryptNewPassword = await Encrypt_Password(gettedData.newPassword);
    const result = await User_Model.findByIdAndUpdate({ _id: user._id }, {
        password: encryptNewPassword,
        passwordChangeAt: new Date
    }, { new: true })

    const html = `<h1>Your Password Is Changed !</h1><br><p>If its not you then come to CODE_NOTE and change your password *</p>`
    const subject = "Your CODE_NOTE account password is changed !"
    SendEmail(user.email, html, subject);

    return result;
}

const Forget_Password_Service = async (email: string) => {

    // check if the email is realy exist or not ;
    if (!email) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, "Please Provide Your Email");
    }
    const isEmailExist = await User_Model.findOne({ email });
    if (!isEmailExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found *");
    }
    // create a short period token for reset password 
    const resetToken = Create_JWT_Token({
        role: isEmailExist.role,
        email: isEmailExist.email
    }, '5m')
    // if user found then send a link to user email, when user click it then it will nagivate the user to set a new password page
    const forgetPass_url = `${config.client_url}/auth/reset?userEmail=${isEmailExist.email}&token=${resetToken}`;
    SendEmail(isEmailExist.email, `<h1>Click The Link To Change Your Password</h1><br><a href="${forgetPass_url}">Click Here 🤩</a>`, "Forget Your CODE_NOTE Password");

    return "Email Send Successfully form the server !"
}

const Reset_Password_Service = async (gettedData: Reset_Password_Type, token: string) => {
    // check if the user is exist by the email
    const user = await User_Model.findOne({ email:gettedData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found *");
    }
    const decodedTokenData = Decode_Token(token) as JwtPayload;
    if(decodedTokenData.email !== user.email){
        throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Unauthorized Access *");
    }

    const encodeNewPassword = await Encrypt_Password(gettedData.newPassword);

    const result = await User_Model.findByIdAndUpdate({_id:user._id},{
        password:encodeNewPassword,
        passwordChangeAt:new Date
    },{new:true})


    const to = user.email;
    const html = `<h1>Someone reset your CODE_NOTE account password</h1><br><p>If, it's not you then come to CODE_NOTE and secure your account</p><br><p>Or If it's you then avoid this email and carry on !!</p>`
    const subject = "Your CODE_NOTE account password reset successful !";
    SendEmail(to,html,subject);

    return result;
}



export const Auth_Services = {
    Auth_Login_Service,
    Refresh_Token_Service,
    Change_Password_Service,
    Forget_Password_Service,
    Reset_Password_Service
}

