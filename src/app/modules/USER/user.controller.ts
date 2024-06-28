import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { User_Services } from "./user.services";



const Create_Teacher_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await User_Services.Create_Teacher_Service(req.body);
    res.status(httpStatus.OK).json({
        success:true,
        message : "Teacher Created Successfully !",
        data : result
    })
})

const Create_Student_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await User_Services.Create_Student_Service(req.body);
    res.status(httpStatus.OK).json({
        success:true,
        message : "Student Created Successfully !",
        data : result
    })
})

export const User_Controller = {
    Create_Student_Controller,
    Create_Teacher_Controller,
}