import express from 'express';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Cookie_Data_Type, Zod_Create_Token_Data_Type } from './auth.zod.validation';
import { Auth_Contollers } from './auth.controller';


const router = express.Router();


// user login route
router.post('/login',Zod_Validation_Request(Zod_Create_Token_Data_Type),Auth_Contollers.Auth_Login_Controller)
// refresh token route
router.get('/refresh',Zod_Validation_Request(Zod_Cookie_Data_Type),Auth_Contollers.Refresh_Token_Controller)

export const Auth_Router = router;