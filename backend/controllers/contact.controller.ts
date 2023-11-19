import express, {Response,Request} from "express";
import errorHandler from "../middleware/errorHandler";
import expressAsyncHandler from "express-async-handler";

// description - GET all contacts
// route - GET /api/contacts
// access - public
export const getContacts = async(req:Request,res:Response) => {
    res.status(200).json({ // response containing json body
        success: true,
        message: "Welcome to your contacts!"
    });
};
// description - GET single contact
// route - GET /api/contacts/:id
// access - public
export const getSingleContact = async(req:Request,res:Response) => {
    res.status(200).json({ // response containing json body
        success: true,
        message: `The following Contact: ${req.params.id}`
    });
};
// description - Create a contact
// route - POST /api/contacts/
// access - private
export const createContact = async(req:Request,res:Response) => {
    console.log(req.body);
    // destructuring the request body
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are compulsory!");
    }
    res.status(201).json({ // response containing json body
        success: true,
        message: `Contact created: ${req.body.name}`
    });
};
// description - Update a contact
// route - PUT /api/contacts/:id
// access - private
export const updateContact = async(req:Request,res:Response) => {
    res.status(201).json({ // response containing json body
        success: true,
        message: `Update Contact : ${req.params.id}`
    });
};
// description - Delete all contacts
// route - DELETE /api/contacts
// access - private
export const deleteContact = async(req:Request,res:Response) => {
    res.status(200).json({ // response containing json body
        success: true,
        message: `Delete Contact: ${req.params.id}`
    });
};