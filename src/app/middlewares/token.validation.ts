import { NextFunction, Request, Response } from "express"
import Final_App_Error from "../errors/Final_App_Error";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User_Role_Types } from "../global/interfaces";
import Async_Catch from "../utils/try.code";
import { User_Model } from "../modules/USER/user.model";
import { Status_Type } from "../global/global.constant";


const Token_Verify = (...roles: User_Role_Types[]) => {
    return Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // if there is no token
        if (!token) {
            throw new Final_App_Error(httpStatus.FORBIDDEN, "Forbidden User");
        }
        // set token data to req.user
        let decodedData=null;
        try{
             decodedData = jwt.verify(token, (config.jwt_secret as string)) as JwtPayload;
            if(!decodedData){
                console.log('Fire decode is null',decodedData);
                throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Unauthorized Access found*");
            }
        }catch(err){
            throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Unauthorized Access found ++*");
        }
        const user = await User_Model.findOne({ email: decodedData!.email });
        // if user not found by token email
        if (!user) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
        }
        // if user is blocked
        if (user.status === Status_Type.Block) {
            throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
        }
        // if the user role is not matched with required role types
        if (roles && !roles.includes(user.role)) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not authorized *")
        }

        // check first, is password updated or not, if updated then check the time 
        if(user?.passwordChangeAt && User_Model.isTokenValid(Number(decodedData!.iat),user?.passwordChangeAt)){
            throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Unauthorized Access *");
        }
        req.user = decodedData!;
        next();
    })
}

export default Token_Verify;
