import express from 'express'
import { User_Router } from '../modules/USER/user.route';
import { Teacher_Router } from '../modules/TEACHER/teacher.router';

const router = express.Router();

const projectRoutes = [
    {
        path: '/user',
        route: User_Router
    },
    {
        path:'/teacher',
        route : Teacher_Router
    }
]


projectRoutes.forEach(one=>router.use(one.path,one.route))

export default router;