import express, { Request, Response } from 'express'
import { User_Controller } from './user.controller';
import { Get_Teacher_Schema } from '../TEACHER/teacher.zod.validation';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Get_Student_Schema } from '../STUDENT/student.zod.validation';


const router = express.Router();

// create teacher route
router.post('/teacher',Zod_Validation_Request(Get_Teacher_Schema),User_Controller.Create_Teacher_Controller);
// create student route
router.post('/student',Zod_Validation_Request(Get_Student_Schema),User_Controller.Create_Student_Controller);


export const User_Router = router;