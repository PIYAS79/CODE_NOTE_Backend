import express from 'express'
import { User_Router } from '../modules/USER/user.route';
import { Teacher_Router } from '../modules/TEACHER/teacher.router';
import { Student_Router } from '../modules/STUDENT/student.route';
import { Code_Router } from '../modules/CODE/code.route';
import { Auth_Router } from '../modules/AUTH/auth.router';
import { Stack_Router } from '../modules/STACK/stack.router';

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
    },
    {
        path:'/auth',
        route : Auth_Router
    },
    {
        path:'/stack',
        route : Stack_Router
    }
]


projectRoutes.forEach(one=>router.use(one.path,one.route))

export default router;