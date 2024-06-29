import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Code_Services } from "./code.services";
import httpStatus from "http-status";



const Create_Code_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.body;
    const result = await Code_Services.Create_Code_Service(gettedData);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully create a code !",
        data: result
    })
})
const Get_All_Code_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await Code_Services.Get_All_Code_Service();

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve all codes !",
        data: result
    })
})
const Get_Single_Code_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const cid = req.params.cid;
    const result = await Code_Services.Get_Single_Code_Service(cid);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve a code !",
        data: result
    })
})
const Get_User_Codes_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const uid = req.params.uid;
    const result = await Code_Services.Get_User_Codes_Service(uid);


    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve a user codes !",
        data: result
    })
})

export const Code_Controller = {
    Create_Code_Controller,
    Get_All_Code_Controller,
    Get_Single_Code_Controller,
    Get_User_Codes_Controller
}