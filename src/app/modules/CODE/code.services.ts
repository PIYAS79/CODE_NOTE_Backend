import { Code_Type } from "./code.interface";
import { Code_Model } from "./code.model";


const Create_Code_Service = async(gettedData:Code_Type) =>{
    const result = await Code_Model.create(gettedData);
    return result;
}



export const Code_Services = {
    Create_Code_Service,
}