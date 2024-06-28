import { Erorr_Source_Type } from "../errors/errorInterface";
import {ZodError,ZodIssue} from 'zod';
import mongoose from 'mongoose';



export const zodValidationError=(err:ZodError)=>{
    const errorTitle = "Type Validation Error (zod) *";
    const errorSouce:Erorr_Source_Type = err.issues.map((one:ZodIssue)=>({
        path:one.path[one.path.length-1],
        message : one.message
    }))
    return {errorTitle,errorSouce}
}
export const mongooseValidationErorr=(err:mongoose.Error.ValidationError)=>{
    const errorTitle = "Type Validation Error (mongoose) *";
    const errorSouce:Erorr_Source_Type = Object.values(err.errors).map((one:mongoose.Error.ValidatorError|mongoose.Error.CastError)=>{
        return({
            path:one.path,
            message:one.message
        })
    })
    return {errorTitle,errorSouce}
}
export const duplicateKeyError =(err:any)=>{
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
export const refNotFoundError=(err:mongoose.Error.CastError)=>{
    const errorTitle = "Reference not found *";
    const errorSouce:Erorr_Source_Type = [{
        path : err.path,
        message:err.message
    }]
    return {errorTitle,errorSouce}
}