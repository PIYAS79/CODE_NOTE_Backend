import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";





const Create_Teacher_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
  
    
    res.status(httpStatus.OK).json({
        success:true,
        message : "Teacher Created Successfully !"
    })
})