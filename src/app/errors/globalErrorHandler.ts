import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../config';
import { Erorr_Source_Type } from './errorInterface';
import {ZodError} from 'zod';
import Final_App_Error from './Final_App_Error';
import { duplicateKeyError, mongooseValidationErorr, refNotFoundError, zodValidationError } from '../utils/errorHandler';


const global_Error_Handler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("========================>",err);
   
    let errorTitle = "There is a server side error *"
    let errorSource :Erorr_Source_Type = [{
        path : '',
        message :  "There is a server side error *"
    }]
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    if(err instanceof ZodError){
        const gettedFormat = zodValidationError(err);
        errorTitle = gettedFormat.errorTitle;
        errorSource = gettedFormat.errorSouce;
    }else if(err.name === 'ValidationError'){
        const gettedFormat = mongooseValidationErorr(err);
        errorTitle = gettedFormat.errorTitle;
        errorSource = gettedFormat.errorSouce;
    }else if(err.code === 11000){
        const gettedFormat = duplicateKeyError(err);
        errorTitle = gettedFormat.errorTitle;
        errorSource = gettedFormat.errorSouce;
    }else if(err.name === 'CastError'){
        const gettedFormat = refNotFoundError(err);
        errorTitle = gettedFormat.errorTitle;
        errorSource = gettedFormat.errorSouce;
    }else if(err instanceof Error){
        errorTitle = err.message,
        errorSource = [{
            path : '',
            message : err.message
        }]
    }else if(err instanceof Final_App_Error){
        errorTitle = err.message,
        errorSource = [{
            path : '',
            message : err.message
        }]
    }

    res.status(statusCode).json({
        success: false,
        errorTitle,
        errorSource,
        stack: config.developement_status==='DEVELOPMENT'?err.stack:"",
        err
    })
}

export default global_Error_Handler;