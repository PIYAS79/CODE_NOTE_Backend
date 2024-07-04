import express from 'express';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Ask_Status_Type, Zod_Code_Stack_Type } from './stack.zod.validation';
import { Stack_Controller } from './stack.controller';
import Token_Verify from '../../middlewares/token.validation';
import { Role_Types } from '../../global/global.constant';


const router = express.Router();

// create a req on stack 
router.post('/',Zod_Validation_Request(Zod_Code_Stack_Type),Stack_Controller.Create_Code_Req_Controller);
// cancel a request 
router.delete('/:sid',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Stack_Controller.Cancel_Code_Req_Controller);
// get own reqest (my requst ; rid=who create request,his/her user _id)
router.get('/req/:ruid',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Stack_Controller.Get_My_All_Requests_Controller);
// get own ask 
router.get('/ask/:id',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Stack_Controller.Get_My_All_Ask_Controller)
// update req status by author
router.patch('/ask/:sid',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Zod_Validation_Request(Zod_Ask_Status_Type),Stack_Controller.Ask_Decision_Req_Controller);

export const Stack_Router = router;