import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { User_Services } from "./user.services";


// create teacher controller
const Create_Teacher_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const { teacher, AccessToken, RefreshToken } = await User_Services.Create_Teacher_Service(req.body);
    res.cookie('refreshToken',RefreshToken,{
        httpOnly:true,
        secure:true,
    }).status(httpStatus.OK).json({
        success: true,
        message: "Teacher Created Successfully !",
        data: { AccessToken,teacher}
    })
})

// create student controller
const Create_Student_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const {student,AccessToken,RefreshToken} = await User_Services.Create_Student_Service(req.body);
    res.cookie('refreshToken',RefreshToken,{
        httpOnly:true,
        secure:true,
    }).status(httpStatus.OK).json({
        success: true,
        message: "Student Created Successfully !",
        data: {AccessToken,student}
    })
})

// upload profile picture controller
const Upload_Profile_Pic_Controller=Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await User_Services.Upload_Profile_Picture_Service(req.file,req.query,req.user);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Profile Picture Successfully Uploaded !",
        data: result
    })
})


export const User_Controller = {
    Create_Student_Controller,
    Create_Teacher_Controller,
    Upload_Profile_Pic_Controller
}