
import express from 'express';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Code_Schema, Zod_Update_Code_Schema } from './code.zod.validation';
import { Code_Controller } from './code.controller';
import Token_Verify from '../../middlewares/token.validation';
import { Role_Types } from '../../global/global.constant';

const router = express.Router();


// create a code 
router.post('/',Zod_Validation_Request(Zod_Code_Schema),Code_Controller.Create_Code_Controller);
// get all code 
router.get('/',Code_Controller.Get_All_Code_Controller);
// get single code 
router.get('/:cid',Code_Controller.Get_Single_Code_Controller);
// get a user codes 
router.get('/user/:uid',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Code_Controller.Get_User_Codes_Controller);
// update a code 
router.patch('/:cid',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Zod_Validation_Request(Zod_Update_Code_Schema),Code_Controller.Update_Code_Controller)
// delete a code 
router.delete('/:cid',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Code_Controller.Delete_Code_Controller)
// get user star codes
router.get('/star/:uid',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Code_Controller.Get_User_Star_Code_Controller)

export const Code_Router = router;
