import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Auth_Services } from "./auth.services";
import httpStatus from "http-status";
import config from "../../config";



const Auth_Login_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.body;
    const {AccessToken,RefreshToken} = await Auth_Services.Auth_Login_Service(gettedData);

    res.cookie('refreshToken',RefreshToken,{
        httpOnly:true,
        secure: config.developement_status==='DEVELOPMENT'
    }).status(httpStatus.OK).json({
        success: true,
        message: "Successfully login user !",
        data: {AccessToken}
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

export const Auth_Contollers = {
    Auth_Login_Controller,
    Refresh_Token_Controller
}