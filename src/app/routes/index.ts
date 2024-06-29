import express from 'express'
import { User_Router } from '../modules/USER/user.route';
import { Teacher_Router } from '../modules/TEACHER/teacher.router';
import { Student_Router } from '../modules/STUDENT/student.route';
import { Code_Router } from '../modules/CODE/code.route';

const router = express.Router();

const projectRoutes = [
    {
        path: '/user',
        route: User_Router
    },
    {
        path:'/teacher',
        route : Teacher_Router
    },
    {
        path:'/student',
        route : Student_Router
    },
    {
        path:'/code',
        route : Code_Router
    }
]


projectRoutes.forEach(one=>router.use(one.path,one.route))

export default router;