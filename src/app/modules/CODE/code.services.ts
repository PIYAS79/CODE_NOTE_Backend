import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_App_Error";
import { User_Model } from "../USER/user.model";
import { Code_Type } from "./code.interface";
import { Code_Model } from "./code.model";
import { JwtPayload } from "jsonwebtoken";
import { SendEmail } from "../../utils/nodeMailer";
import { User_Type } from "../USER/user.interface";
import Query_Builder from "../../class/query.builder";
import { Student_Model } from "../STUDENT/student.model";
import { Teacher_Model } from "../TEACHER/teacher.model";


// create a code
const Create_Code_Service = async (gettedData: Code_Type) => {
    const uid = gettedData.author;
    const isUserExist = await User_Model.findById({ _id: uid }) as User_Type;
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found !");
    }
    const result = await Code_Model.create(gettedData);
    const html = `<h1>You Create a new code !</h1><br><p>Happy coding from CODE_NOTE</p>`;
    const subject = "CODE_NOTE : You create a code !"
    // SendEmail(isUserExist.email, html, subject);
    return result;
}
// get all code of a collection
const Get_All_Code_Service = async (query: Record<string, unknown>) => {
    const partialSearchTags = ['title', 'courseCode', 'language'];
    const codeQueryInstance = new Query_Builder(Code_Model.find(), query)
        .searchQuery(partialSearchTags)
        .sortQuery()
        .fieldLimit()
        .pageQuery()
        .filterQuery();
    const result = await codeQueryInstance.modelQuery;
    const meta = await codeQueryInstance.countTotalMeta();
    return { result, meta };

}
// get a single code details
const Get_Single_Code_Service = async (cid: string) => {
    const code = await Code_Model.findOne({ _id: cid }) as Code_Type;
    // if(!result){
    //     throw new Final_App_Error(httpStatus.NOT_FOUND,"Code not found !")
    // }
    let code_author:any;
    // find the author,     
    const author = await User_Model.findById(code.author._id) as any;
    // check role
    if (author.role === 'STUDENT') {
        // for student
        const studentAuthor = await Student_Model.findOne({ email: author.email });
        code_author = studentAuthor;
    } else if (author.role === 'TEACHER') {
        // for teacher
        const teacherAuthor = await Teacher_Model.findOne({ email: author.email });
        code_author = teacherAuthor;
    }
    // send student or teacher data
    return { code, author: code_author,authorPP:author.profileImage };
}
// get a user all codes
const Get_User_Codes_Service = async (uid: string, query: any) => {
    const isUserExist = await User_Model.findById({ _id: uid });
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found !");
    }
    // const result = await Code_Model.find({ author: uid });
    // return result;
    const partialSearchTags = ['title', 'courseCode', 'language'];
    const codeInstance = new Query_Builder(Code_Model.find({ author: uid }), query)
        .searchQuery(partialSearchTags)
        .fieldLimit()
        .filterQuery()
        .sortQuery()
        .pageQuery()
    const result = await codeInstance.modelQuery;
    const meta = await codeInstance.countTotalMeta();
    return { result, meta };
}
const Update_Code_Service = async (cid: string, gettedData: Partial<Code_Type>, tokenData: JwtPayload) => {
    // find the code through cid
    const code = await Code_Model.findOne({ _id: cid });
    if (!code) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Code not found *")
    }
    // find the user through token.email
    const user = await User_Model.findOne({ email: tokenData.email });
    // if this user _id is not matched with the gettedData author, (means you got any other token but the code is not the exact person)
    if ((code?.author)?.toString() !== (user?._id)?.toString()) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *")
    }
    const remainingProperties: Record<string, unknown> = {
        ...gettedData
    }
    const result = await Code_Model.findByIdAndUpdate({ _id: cid }, remainingProperties, { new: true });
    return result;
}
const Delete_Code_Service = async (cid: string, tokenData: JwtPayload) => {

    // find the code through cid
    const code = await Code_Model.findOne({ _id: cid });
    if (!code) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Code not found *")
    }
    // find the user through token.email
    const user = await User_Model.findOne({ email: tokenData.email });
    // if this user _id is not matched with the gettedData author
    if ((code?.author)?.toString() !== (user?._id)?.toString()) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *")
    }

    const result = await Code_Model.findByIdAndDelete({ _id: cid });
    return result;
}

// get a user star codes service 
const Get_User_Star_Code_Service = async (uid:string,tokenData:JwtPayload) => {
    
    // get star codes by prop "author"
    const datas = await Code_Model.find({author:uid,isStar:true});

    return datas;
}

export const Code_Services = {
    Create_Code_Service,
    Get_All_Code_Service,
    Get_Single_Code_Service,
    Get_User_Codes_Service,
    Update_Code_Service,
    Delete_Code_Service,
    Get_User_Star_Code_Service
}