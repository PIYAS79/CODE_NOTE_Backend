
import express from 'express'
import { Teache_Controller } from './teacher.controller'
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_UPDATE_Teacher_Schema } from './teacher.zod.validation';
import Token_Verify from '../../middlewares/token.validation';
import { Role_Types } from '../../global/global.constant';

const router = express.Router()


// Get all teacher route
router.get('/',Teache_Controller.Get_All_Teacher_Contoller);
// get single teacher
router.get('/:tid',Token_Verify(Role_Types.Admin,Role_Types.Super,Role_Types.Teacher),Teache_Controller.Get_Single_Teacher_Contoller);
// update a teacher data
router.patch('/:tid',Token_Verify(Role_Types.Admin,Role_Types.Super,Role_Types.Teacher),Zod_Validation_Request(Zod_UPDATE_Teacher_Schema),Teache_Controller.Update_Single_Teacher_Contoller);
// delete a teacher
router.delete('/:tid',Token_Verify(Role_Types.Admin,Role_Types.Super,Role_Types.Teacher),Teache_Controller.Delete_Single_Teacher_Contoller);


export const Teacher_Router = router;