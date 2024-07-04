import httpStatus from "http-status";
import Final_App_Error from "../errors/Final_App_Error";
import { Student_Model } from "../modules/STUDENT/student.model";
import { Role_Types } from "../global/global.constant";
import { Teacher_Model } from "../modules/TEACHER/teacher.model";



export const find_Code_Author_Name = async(role:string,email:string)=>{
    let authorName;
    if(role===Role_Types.Student){
        const student = await Student_Model.findOne({email:email});
        if(!student){
            throw new Final_App_Error(httpStatus.NOT_FOUND,"Author not found *");
        }
        if(student.name.m_name){
            authorName = `${student.name.f_name} ${student.name.m_name} ${student.name.l_name}`
        }else{
            authorName = `${student.name.f_name} ${student.name.l_name}`
        }
    }
    if(role===Role_Types.Teacher){
        const teacher = await Teacher_Model.findOne({email:email});
        if(!teacher){
            throw new Final_App_Error(httpStatus.NOT_FOUND,"Author not found *");
        }
        if(teacher.name.m_name){
            authorName = `${teacher.name.f_name} ${teacher.name.m_name} ${teacher.name.l_name}`
        }else{
            authorName = `${teacher.name.f_name} ${teacher.name.l_name}`
        }
    }else{
        authorName = "CODE_NOTE Authority"
    }
    

    return authorName;
}