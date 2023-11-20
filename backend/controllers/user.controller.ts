require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userModel from "../models/user.model";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

// description - Register an user
// route - POST /api/users/register
// access - private
export const registerUser = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await userModel.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hashing the user password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed password: " , hashedPassword);
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword, // got error due to not defining 'password'
    });

    if(user){
        res.status(201).json({
            success: true,
            _id: user.id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('User data is invalid!');
    }
});

// description - Login an user
// route - POST /api/users/login
// access - private
// JWT Access token to verify the user
export const loginUser = asyncHandler(async(req:Request,res:Response)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are necessary!");
    }

    const user = await userModel.findOne({email});
    // compare the password with hashed password
    if(user && (await bcrypt.compare(password,user.password))) {
        const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            }, 
            process.env.ACCESS_TOKEN_SECRET || "", {expiresIn: "30m"}
        );
        res.status(200).json({
            success: true,
            accessToken,
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password!");
    }
});
// description - Get current user information
// route - GET /api/users/current
// access - private
interface AuthenticatedRequest extends Request {
    user?: any;
}
export const currentUser = asyncHandler(async(req:AuthenticatedRequest,res:Response)=>{
    res.json(req.user);
});