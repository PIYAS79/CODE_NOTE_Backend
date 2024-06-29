import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Code_Type } from "./code.interface";
import { Code_Model } from "./code.model";


const Create_Code_Service = async(gettedData:Code_Type) =>{
    const uid = gettedData.author;
    const isUserExist = await User_Model.findById({_id:uid});
    if(!isUserExist){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"User not found !");
    }
    const result = await Code_Model.create(gettedData);
    return result;
}
const Get_All_Code_Service = async() =>{
    const result = await Code_Model.find();
    return result;
}
const Get_Single_Code_Service = async(cid:string) =>{
    const result = await Code_Model.find({_id:cid});
    return result;
}
const Get_User_Codes_Service = async(uid:string) =>{
    const isUserExist = await User_Model.findById({_id:uid});
    if(!isUserExist){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"User not found !");
    }
    const result = await Code_Model.find({author:uid});
    return result;
}
const Update_Code_Service = async(cid:string) =>{
    const result = {};
    return result;
    // {{{{{{{{{{{{}}}}}}}}}}}}
}
const Delete_Code_Service = async(cid:string) =>{
    const result = {};
    return result;
        // {{{{{{{{{{{{}}}}}}}}}}}}
}


export const Code_Services = {
    Create_Code_Service,
    Get_All_Code_Service,
    Get_Single_Code_Service,
    Get_User_Codes_Service,
    Update_Code_Service
}