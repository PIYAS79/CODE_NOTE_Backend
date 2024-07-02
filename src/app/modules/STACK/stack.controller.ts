import { NextFunction,Request,Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Stack_Services } from "./stack.services";




const Create_Code_Req_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await Stack_Services.Create_Code_Req_Service(req.body);

    res.status(httpStatus.OK).json({
        success:true,
        message : "Request Created Successfully !",
        data : result
    })
})
const Cancel_Code_Req_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;
    const result = await Stack_Services.Cancel_Code_Req_Service(req.params.sid,token as string)

    res.status(httpStatus.OK).json({
        success:true,
        message : "Request Delete Successfully !",
        data : result
    })
})


export const Stack_Controller = {
    Create_Code_Req_Controller,
    Cancel_Code_Req_Controller
}