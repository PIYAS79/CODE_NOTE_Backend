import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Auth_Services } from "./auth.services";
import httpStatus from "http-status";
import config from "../../config";



const Auth_Login_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.body;
    const {AccessToken,RefreshToken,user} = await Auth_Services.Auth_Login_Service(gettedData);

    res.cookie('refreshToken',RefreshToken,{
        httpOnly:true,
        secure: true
    }).status(httpStatus.OK).json({
        success: true,
        message: "Successfully login user !",
        data: {AccessToken,user}
    })
})
const Refresh_Token_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const {AccessToken,userId} = await Auth_Services.Refresh_Token_Service(req.cookies.refreshToken)
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get refresh token !",
        data: {AccessToken,userId}
    })
})

const Change_Password_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    
    const token = req.headers.authorization as string;
    const data = req.body;
    const result = await Auth_Services.Change_Password_Service(data,token);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully change password !",
        data: result
    })
})

const Forget_Password_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{

    const email = req.body;
    const result = await Auth_Services.Forget_Password_Service(email.email);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Forget Password Attemp Successfull, Check Email and Follow The Link !",
        data: result
    })
})

const Reset_Password_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{

    const gettedData = req.body;
    // add token verification
    const token = req.headers.authorization as string;
    const result = await Auth_Services.Reset_Password_Service(gettedData,token);
    
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Reset Your Password !",
        data: result
    })
})

export const Auth_Contollers = {
    Auth_Login_Controller,
    Refresh_Token_Controller,
    Change_Password_Controller,
    Forget_Password_Controller,
    Reset_Password_Controller
}