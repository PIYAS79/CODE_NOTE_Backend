
import express from 'express';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Code_Schema } from './code.zod.validation';
import { Code_Controller } from './code.controller';

const router = express.Router();


// create a code 
router.post('/',Zod_Validation_Request(Zod_Code_Schema),Code_Controller.Create_Code_Controller);
// get all code 
router.get('/',Code_Controller.Get_All_Code_Controller);
// get single code 
router.get('/:cid',Code_Controller.Get_Single_Code_Controller);
// get a user codes 
router.get('/user/:uid',Code_Controller.Get_User_Codes_Controller);


export const Code_Router = router;