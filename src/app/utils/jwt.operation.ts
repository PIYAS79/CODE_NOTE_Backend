import jwt from 'jsonwebtoken';
import config from '../config';


interface JWT_Get_Data_Type {
    role:string,
    userId:string
}

export const Create_JWT_Token = (data:JWT_Get_Data_Type,exTime:string) => {

    const token = jwt.sign({
        role:data.role,
        userId:data.userId
    },(config.jwt_secret as string),{expiresIn:exTime})
    return token;
}

export const Decode_Token = (token:string)=>{
    const decodedData = jwt.verify(token,(config.jwt_secret as string));
    return decodedData;
}