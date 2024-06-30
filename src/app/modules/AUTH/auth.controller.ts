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
        secure: config.developement_status==='DEVELOPMENT'
    }).status(httpStatus.OK).json({
        success: true,
        message: "Successfully login user !",
        data: {AccessToken,user}
    })
})
const Refresh_Token_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const {AccessToken} = await Auth_Services.Refresh_Token_Service(req.cookies.refreshToken)
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully login user !",
        data: {AccessToken}
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

export const Auth_Contollers = {
    Auth_Login_Controller,
    Refresh_Token_Controller,
    Change_Password_Controller
}