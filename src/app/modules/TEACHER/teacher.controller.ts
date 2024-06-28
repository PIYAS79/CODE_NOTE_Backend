import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Teacher_Services } from "./teacher.services";


const Get_All_Teacher_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Teacher_Services.Get_All_Teacher_Service();
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve all teachers !",
        data: result
    })
})
const Get_Single_Teacher_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.tid;
    const result = await Teacher_Services.Get_Single_Teacher_Service(tid);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve a teacher !",
        data: result
    })
})
const Update_Single_Teacher_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.tid;
    const sendedData = req.body;
    const result = await Teacher_Services.Update_Single_Teacher_Service(tid,sendedData);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully update a teacher !",
        data: result
    })
})
const Delete_Single_Teacher_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.tid;
    const result = await Teacher_Services.Delete_Single_Teacher_Service(tid);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully delete a teacher !",
        data: result
    })
})

export const Teache_Controller = {
    Get_All_Teacher_Contoller,
    Get_Single_Teacher_Contoller,
    Update_Single_Teacher_Contoller,
    Delete_Single_Teacher_Contoller
}