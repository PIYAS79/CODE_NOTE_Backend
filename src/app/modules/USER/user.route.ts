import express, { Request, Response } from 'express'

const router = express.Router();


router.get('/',(req:Request,res:Response)=>{
    res.send("Fuck YOU FROM HERE !")
})


export const User_Router = router;