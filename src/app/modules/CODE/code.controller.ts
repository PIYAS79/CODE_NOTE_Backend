import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Code_Services } from "./code.services";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";



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
    const query = req.query;
    const result = await Code_Services.Get_All_Code_Service(query);
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
    const query = req.query;
    const result = await Code_Services.Get_User_Codes_Service(uid,query);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve a user codes !",
        data: result
    })
})
const Update_Code_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    
    const cid = req.params.cid;
    const tokenData = req.user as JwtPayload;
    const gettedData = req.body;
    const result = await Code_Services.Update_Code_Service(cid,gettedData,tokenData)

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully update a code !",
        data: result
    })
})
const Delete_Code_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    
    const cid = req.params.cid;
    const tokenData = req.user as JwtPayload;
    const result = await Code_Services.Delete_Code_Service(cid,tokenData)

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully delete a code !",
        data: result
    })
})


export const Code_Controller = {
    Create_Code_Controller,
    Get_All_Code_Controller,
    Get_Single_Code_Controller,
    Get_User_Codes_Controller,
    Update_Code_Controller,
    Delete_Code_Controller
}