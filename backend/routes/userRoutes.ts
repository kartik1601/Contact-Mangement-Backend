import express, { Request, Response } from "express";

const userRouter = express.Router();

userRouter.post("/register", (req:Request,res:Response)=>{
    res.json({message: 'Register the user!'});
});

userRouter.post('/login', (req:Request,res:Response) => {
    res.json({message: "Login the user!"})
});

export default userRouter;