import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Teacher_Services } from "./teacher.services";


const Get_All_Teacher_Contoller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Teacher_Services.Get_All_Teacher_Service() ;



    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully retrieve all teachers !",
        data: result
    })
})

export const Teache_Controller ={
    Get_All_Teacher_Contoller,
}