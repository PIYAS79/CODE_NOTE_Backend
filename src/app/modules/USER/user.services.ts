import mongoose from "mongoose"
import { Get_Teacher_Type, Teacher_Type } from "../TEACHER/teacher.interface"
import { User_Type } from "./user.interface"
import { User_Model } from "./user.model"
import Final_App_Error from "../../errors/Final_App_Error"
import httpStatus from "http-status"
import { Teacher_Model } from "../TEACHER/teacher.model"
import { Get_Student_Type, Student_Type } from "../STUDENT/student.interface"
import { Student_Model } from "../STUDENT/student.model"
import { Encrypt_Password } from "../../utils/bcrypt.operation"
import { Create_JWT_Token } from "../../utils/jwt.operation"
import { sendImageToCloudinary } from "../../utils/Upload_Image"
import { JwtPayload } from "jsonwebtoken"


// create teacher service
const Create_Teacher_Service = async (userData: Get_Teacher_Type) => {
    const encryptedPass = await Encrypt_Password(userData.user.password);
    // at first create user
    const newUser: User_Type = {
        email: userData.user.email,
        status: "ACTIVE",
        role: userData.user.role,
        password: encryptedPass,
        profileImage: ''
    }

    const session = await mongoose.startSession();
    try {
        // transaction start from here
        session.startTransaction();
        // at first create a user 
        const user = await User_Model.create([newUser], { session });
        if (!user) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "User creation process is failed for internal server error *");
        }
        // create teacher for separate collection
        const newTeacher: Teacher_Type = {
            user: user[0]._id,
            email: user[0].email,
            name: userData.name,
            teacherId: userData.teacherId,
            department: userData.department,
            skills: [],
            contact: {},
        }
        // after ceating the user now create the teacher
        const teacher = await Teacher_Model.create([newTeacher], { session });
        if (!teacher) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "User creation process is failed for internal server error *");
        }
        // access token 
        const AccessToken = Create_JWT_Token({
            role: user[0].role,
            email: user[0].email
        }, '1hr')
        // refresh token 
        const RefreshToken = Create_JWT_Token({
            role: user[0].role,
            email: user[0].email
        }, '10d')
        await session.commitTransaction();
        await session.endSession()
        return { teacher, AccessToken, RefreshToken };
    } catch (err) {
        await session.abortTransaction();
        await session.endSession()
        throw err;
    }
}

// create student service
const Create_Student_Service = async (userData: Get_Student_Type) => {

    const encryptedPass = await Encrypt_Password(userData.user.password);

    const newUser: User_Type = {
        email: userData.user.email,
        status: "ACTIVE",
        role: userData.user.role,
        password: encryptedPass,
        profileImage: ''
    }

    const session = await mongoose.startSession();
    try {
        // transaction start from here
        session.startTransaction();
        // at first create a user 
        const user = await User_Model.create([newUser], { session });
        if (!user) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "User creation process is failed for internal server error *");
        }
        const newStudent: Student_Type = {
            user: user[0]._id,
            email: user[0].email,
            name: userData.name,
            studentId: userData.studentId,
            department: userData.department,
            skills: [],
            contact: {},
        }
        // after creating the user now create the student
        const student = await Student_Model.create([newStudent], { session });
        if (!student) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "User creation process is failed for internal server error *");
        }
        const AccessToken = Create_JWT_Token({
            role: user[0].role,
            email: user[0].email
        }, '1hr')
        const RefreshToken = Create_JWT_Token({
            role: user[0].role,
            email: user[0].email
        }, '10d')

        await session.commitTransaction();
        await session.endSession()
        return { student, AccessToken, RefreshToken };
    } catch (err) {
        await session.abortTransaction();
        await session.endSession()
        throw err;
    }
}

// upload profile picture service
const Upload_Profile_Picture_Service = async (file: any,query:Record<string,unknown>,tokenData:JwtPayload) => {
    const {email} = query;
    // at first check if the email is provided or not
    if(!email){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"User Data Reference not found !");
    }
    // check is token data and query data are equal or not
    if(tokenData.email !== email){
        throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Token is not matched with reference !");
    }
    const uploadedData:any = await sendImageToCloudinary(file.originalname,file.path);
    
    const result = await User_Model.findOneAndUpdate({email},{profileImage:uploadedData.secure_url},{new:true});

    
    return result;
}

export const User_Services = {
    Create_Teacher_Service,
    Create_Student_Service,
    Upload_Profile_Picture_Service
}