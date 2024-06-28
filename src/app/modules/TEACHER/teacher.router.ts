
import express from 'express'
import { Teache_Controller } from './teacher.controller'

const router = express.Router()


// Get all teacher route
router.get('/',Teache_Controller.Get_All_Teacher_Contoller);


export const Teacher_Router = router;