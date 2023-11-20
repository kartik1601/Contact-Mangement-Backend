import express, { Request, Response } from "express";
import { currentUser, loginUser, registerUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/current', currentUser);

export default userRouter;