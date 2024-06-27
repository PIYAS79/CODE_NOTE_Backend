import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const route_Not_Found_Error = (req:Request,res:Response,next:NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        errorTitle: "Route Not Found *",
        errorSource: {
            path: '',
            message: 'Route Not Found *'
        },
        stack:''
    })
}

export default route_Not_Found_Error;