import express from 'express';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Cookie_Data_Type, Zod_Create_Token_Data_Type, Zod_Password_Change_Data_Type } from './auth.zod.validation';
import { Auth_Contollers } from './auth.controller';
import Token_Verify from '../../middlewares/token.validation';
import { Role_Types } from '../../global/global.constant';


const router = express.Router();


// user login route
router.post('/login',Zod_Validation_Request(Zod_Create_Token_Data_Type),Auth_Contollers.Auth_Login_Controller)
// refresh token route
router.get('/refresh',Zod_Validation_Request(Zod_Cookie_Data_Type),Auth_Contollers.Refresh_Token_Controller)
// change password route
router.patch('/change',Token_Verify(Role_Types.Admin,Role_Types.Student,Role_Types.Super,Role_Types.Teacher),Zod_Validation_Request(Zod_Password_Change_Data_Type),Auth_Contollers.Change_Password_Controller)

export const Auth_Router = router;