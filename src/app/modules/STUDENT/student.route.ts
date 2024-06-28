
import express from 'express'
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Student_Controller } from './student.controller';
import { Zod_UPDATE_Student_Schema } from './student.zod.validation';

const router = express.Router()


// Get all student route
router.get('/',Student_Controller.Get_All_Student_Contoller);
// get single student
router.get('/:tid',Student_Controller.Get_Single_Student_Contoller);
// update a student data
router.patch('/:tid',Zod_Validation_Request(Zod_UPDATE_Student_Schema),Student_Controller.Update_Single_Student_Contoller);
// delete a student
router.delete('/:tid',Student_Controller.Delete_Single_Student_Contoller);


export const Student_Router = router;