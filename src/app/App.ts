import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import httpStatus from 'http-status';
import global_Error_Handler from './errors/globalErrorHandler';
import route_Not_Found_Error from './errors/routeNotFoundError';
import router from './routes';


const app = express();

// ------------------- parsing middleware call --------------------
app.use(express.json());
app.use(cors());

// initial route -------------------------------------------------
app.get('/',(req:Request,res:Response)=>{
    res.status(httpStatus.OK).json({
        success:true,
        message : "Server is running successfully !"
    })
})


// projet routes -------------------------------------------------
app.use('/api/v1',router);

// route not found handler ---------------------------------------
app.use("*",route_Not_Found_Error);
// error handler -------------------------------------------------
app.use(global_Error_Handler);

export default app;