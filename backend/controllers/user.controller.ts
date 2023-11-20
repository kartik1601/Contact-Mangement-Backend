import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";

// description - Register an user
// route - POST /api/users/register
// access - public
export const registerUser = asyncHandler(async(req:Request,res:Response)=>{
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

    const user = await userModel.create({
        username,
        email,
        hashedPassword,
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
// access - public
export const loginUser = asyncHandler(async(req:Request,res:Response)=>{
    res.json({message: 'Login the user!'});
});
// description - Get current user information
// route - GET /api/users/current
// access - private
export const currentUser = asyncHandler(async(req:Request,res:Response)=>{
    res.json({message: 'Current user info!'});
});