import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Student_Services } from "./student.services";


const Get_All_Student_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Student_Services.Get_All_Student_Service();
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve all students !",
        data: result
    })
})
const Get_Single_Student_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.tid;
    const result = await Student_Services.Get_Single_Student_Service(tid);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve a student !",
        data: result
    })
})
const Update_Single_Student_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.tid;
    const sendedData = req.body;
    const result = await Student_Services.Update_Single_Student_Service(tid,sendedData);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully update a student !",
        data: result
    })
})
const Delete_Single_Student_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.tid;
    const result = await Student_Services.Delete_Single_Student_Service(tid);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully delete a student !",
        data: result
    })
})

export const Student_Controller = {
    Get_All_Student_Contoller,
    Get_Single_Student_Contoller,
    Update_Single_Student_Contoller,
    Delete_Single_Student_Contoller
}