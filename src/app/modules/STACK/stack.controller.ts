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
const Get_My_All_Requests_Controller=Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization as string;
    const result = await Stack_Services.Get_My_All_Requests_Service(req.params.ruid,token);

    res.status(httpStatus.OK).json({
        success:true,
        message : "Successfully retrieve all requests !",
        data : result
    })
})
const Get_My_All_Ask_Controller=Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization as string;
    const result = await Stack_Services.Get_My_All_Ask_Service(req.params.id,token);

    res.status(httpStatus.OK).json({
        success:true,
        message : "Successfully retrieve all code ask requests !",
        data : result
    })
})
const Ask_Decision_Req_Controller=Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization as string;
    const gettedData = req.body;
    const result = await Stack_Services.Ask_Decision_Req_Service(req.params.sid,token,gettedData);

    res.status(httpStatus.OK).json({
        success:true,
        message : "Ask request status update successful !",
        data : result
    })
})


export const Stack_Controller = {
    Create_Code_Req_Controller,
    Cancel_Code_Req_Controller,
    Get_My_All_Requests_Controller,
    Get_My_All_Ask_Controller,
    Ask_Decision_Req_Controller
}