import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Teacher_Type } from "./teacher.interface";
import { Teacher_Model } from "./teacher.model"
import mongoose from "mongoose";



const Get_All_Teacher_Service = async () => {
    const data = await Teacher_Model.find().populate('user');
    return data;
}
const Get_Single_Teacher_Service = async (tid: string) => {
    const data = await Teacher_Model.findById(tid).populate('user');
    if (!data) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Teacher not found *");
    }
    return data;
}
const Update_Single_Teacher_Service = async (tid: string, sendedData: Partial<Teacher_Type>) => {
    const teacher = await Teacher_Model.findById({ _id: tid });
    if (!teacher) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Teacher not found *");
    }
    const { name, contact, ...remainingPremetiveType } = sendedData;
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingPremetiveType
    }
    if (name && Object.keys(name).length) {
        for (const [key, val] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = val;
        }
    }
    if (contact && Object.keys(contact).length) {
        for (const [key, val] of Object.entries(contact)) {
            modifiedUpdatedData[`contact.${key}`] = val;
        }
    }

    const data = await Teacher_Model.findByIdAndUpdate(tid, modifiedUpdatedData, { new: true });
    return data;
}
const Delete_Single_Teacher_Service = async (tid: string) => {
    const teacher = await Teacher_Model.findById({ _id: tid });
    if (!teacher) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Teacher not found *");
    }
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const isUserDelete = await User_Model.findByIdAndDelete({ _id: teacher.user });
        if(!isUserDelete){
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR,"User Ref not found !")
        }

        // DELETE CODES {{{{{{{{{{}}}}}}}}}}
        
        const data = await Teacher_Model.findByIdAndDelete({_id: teacher._id });
        await session.commitTransaction();
        await session.endSession();
        return data;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
}

export const Teacher_Services = {
    Get_All_Teacher_Service,
    Update_Single_Teacher_Service,
    Get_Single_Teacher_Service,
    Delete_Single_Teacher_Service
}