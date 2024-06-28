import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../config';
import { Erorr_Source_Type } from './errorInterface';
import {ZodError,ZodIssue} from 'zod';
import mongoose from 'mongoose';


const global_Error_Handler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("========================>",err);
   
    let errorTitle = "There is a server side error *"
    let errorSource :Erorr_Source_Type = [{
        path : '',
        message :  "There is a server side error *"
    }]
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    // zod validion error 
    const zodValidationError=(err:ZodError)=>{
        const errorTitle = "Type Validation Error (zod) *";
        const errorSouce:Erorr_Source_Type = err.issues.map((one:ZodIssue)=>({
            path:one.path[one.path.length-1],
            message : one.message
        }))
        return {errorTitle,errorSouce}
    }
    const mongooseValidationErorr=(err:mongoose.Error.ValidationError)=>{
        const errorTitle = "Type Validation Error (mongoose) *";
        const errorSouce:Erorr_Source_Type = Object.values(err.errors).map((one:mongoose.Error.ValidatorError|mongoose.Error.CastError)=>{
            return({
                path:one.path,
                message:one.message
            })
        })
        return {errorTitle,errorSouce}
    }
    const duplicateKeyError =(err:any)=>{
        const regex = /{ email: "([^"]+)" }/;
        const match = err.errmsg.match(regex);
        const finalString = match[1];
        const errorTitle = "Duplicatte key error";
        const errorSouce:Erorr_Source_Type=[{
            path : '',
            message : `${finalString} is already into the DB`
        }]
        return {errorTitle,errorSouce};
    }

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