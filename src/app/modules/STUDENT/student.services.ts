import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import mongoose from "mongoose";
import { Student_Model } from "./student.model";
import { Student_Type } from "./student.interface";



const Get_All_Student_Service = async () => {
    const data = await Student_Model.find().populate('user');
    return data;
}
const Get_Single_Student_Service = async (tid: string) => {
    const data = await Student_Model.findById(tid).populate('user');
    if (!data) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Student not found *");
    }
    return data;
}
const Update_Single_Student_Service = async (tid: string, sendedData: Partial<Student_Type>) => {
    const teacher = await Student_Model.findById({ _id: tid });
    if (!teacher) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Student not found *");
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

    const data = await Student_Model.findByIdAndUpdate(tid, modifiedUpdatedData, { new: true });
    return data;
}
const Delete_Single_Student_Service = async (tid: string) => {
    const student = await Student_Model.findById({ _id: tid });
    if (!student) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Student not found *");
    }
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const isUserDelete = await User_Model.findByIdAndDelete({ _id: student.user });
        if(!isUserDelete){
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR,"User Ref not found !")
        }

        // DELETE CODES {{{{{{{{{{}}}}}}}}}}
        
        const data = await Student_Model.findByIdAndDelete({_id: student._id });
        await session.commitTransaction();
        await session.endSession();
        return data;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
}

export const Student_Services = {
    Get_All_Student_Service,
    Get_Single_Student_Service,
    Update_Single_Student_Service,
    Delete_Single_Student_Service
}