
import express from 'express'
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Student_Controller } from './student.controller';
import { Zod_UPDATE_Student_Schema } from './student.zod.validation';
import Token_Verify from '../../middlewares/token.validation';
import { Role_Types } from '../../global/global.constant';

const router = express.Router()


// Get all student route
router.get('/',Student_Controller.Get_All_Student_Contoller);
// get single student
router.get('/:tid',Token_Verify(Role_Types.Admin,Role_Types.Super,Role_Types.Student),Student_Controller.Get_Single_Student_Contoller);
// update a student data
router.patch('/:tid',Token_Verify(Role_Types.Admin,Role_Types.Super,Role_Types.Student),Zod_Validation_Request(Zod_UPDATE_Student_Schema),Student_Controller.Update_Single_Student_Contoller);
// delete a student
router.delete('/:tid',Token_Verify(Role_Types.Admin,Role_Types.Super,Role_Types.Student),Student_Controller.Delete_Single_Student_Contoller);


export const Student_Router = router;