import express from 'express'
import { User_Router } from '../modules/USER/user.route';

const router = express.Router();

const projectRoutes = [
    {
        path: '/user',
        route: User_Router
    }
]


projectRoutes.forEach(one=>router.use(one.path,one.route))

export default router;