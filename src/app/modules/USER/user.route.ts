import express, { Request, Response } from 'express'
import { User_Controller } from './user.controller';
import { Get_Teacher_Schema } from '../TEACHER/teacher.zod.validation';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Get_Student_Schema } from '../STUDENT/student.zod.validation';
import { upload } from '../../utils/Upload_Image';
import Token_Verify from '../../middlewares/token.validation';
import { Role_Types } from '../../global/global.constant';


const router = express.Router();

// create teacher route
router.post('/teacher',Zod_Validation_Request(Get_Teacher_Schema),User_Controller.Create_Teacher_Controller);
// create student route
router.post('/student',Zod_Validation_Request(Get_Student_Schema),User_Controller.Create_Student_Controller);
// upload profile picture route
router.patch('/profilepic',Token_Verify(Role_Types.Student,Role_Types.Teacher,Role_Types.Admin,Role_Types.Super),upload.single('file'),User_Controller.Upload_Profile_Pic_Controller);


export const User_Router = router;