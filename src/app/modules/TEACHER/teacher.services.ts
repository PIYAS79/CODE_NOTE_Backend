import { Teacher_Model } from "./teacher.model"



const Get_All_Teacher_Service =async () =>{

    const data = await Teacher_Model.find().populate('user');

    return data;
}


export const Teacher_Services = {
    Get_All_Teacher_Service,
}