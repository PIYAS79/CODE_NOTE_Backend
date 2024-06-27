import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../config';


const global_Error_Handler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            errorTitle: "There is a server side error *",
            errorSource: {
                path: '',
                message: ''
            },
            stack: config.developement_status==='DEVELOPMENT'?err.stack:""
        })
    }
}

export default global_Error_Handler;