import express from 'express';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Code_Stack_Type } from './stack.zod.validation';
import { Stack_Controller } from './stack.controller';
import Token_Verify from '../../middlewares/token.validation';
import { Role_Types } from '../../global/global.constant';


const router = express.Router();

// get all stack code

// create a req on stack 
router.post('/',Zod_Validation_Request(Zod_Code_Stack_Type),Stack_Controller.Create_Code_Req_Controller);
// cancel request 
router.delete('/:sid',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Stack_Controller.Cancel_Code_Req_Controller);
// get own reqest (my requst)

// get own ask 

// update req status by author


export const Stack_Router = router;