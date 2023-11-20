import express from "express";
import { currentUser, loginUser, registerUser } from "../controllers/user.controller";
import isAuthorized from "../middleware/validateToken";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/current', isAuthorized,currentUser);

export default userRouter;