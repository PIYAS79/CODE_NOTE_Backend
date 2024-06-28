import mongoose from "mongoose"
import { Get_Teacher_Type, Teacher_Type } from "../TEACHER/teacher.interface"
import { User_Type } from "./user.interface"
import { User_Model } from "./user.model"
import Final_App_Error from "../../errors/Final_App_Error"
import httpStatus from "http-status"
import { Teacher_Model } from "../TEACHER/teacher.model"



const Create_Teacher_Service = async(userData: Get_Teacher_Type) => {

    const newUser: User_Type = {
        email: userData.user.email,
        status: "ACTIVE",
        role: userData.user.role,
        isDeleted: false,
        userId: userData.user.userId,
        password: userData.user.password,
        profileImage:'',
    }

    const session = await mongoose.startSession();
    try{
        // transaction start from here
        session.startTransaction();
        // at first create a user 
        const user = await User_Model.create([newUser],{session});
        if(!user){
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR,"User creation process is failed for internal server error *");
        }
        const newTeacher: Teacher_Type = {
            user: user[0]._id,
            email: user[0].email,
            name: userData.name,
            teacherId: userData.teacherId,
            department: userData.department,
            skills: [],
            contact:{},
            codes:[]
        }
        // after ceating the user now create the teacher
        const teacher = await Teacher_Model.create([newTeacher],{session});
        if(!teacher){
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR,"User creation process is failed for internal server error *");
        }
        await session.commitTransaction();
        await session.endSession()
        return teacher;
    }catch(err){
        await session.abortTransaction();
        await session.endSession()
        throw err;
    }
}


export const User_Services = {
    Create_Teacher_Service,
}