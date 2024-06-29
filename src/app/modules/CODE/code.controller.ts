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


export const Code_Controller = {
    Create_Code_Controller,
}