import express, {Response,Request} from "express";
import asyncHandler from "express-async-handler"; // for implementing auto try-catch blocks
import contactModel from "../models/contact.model";
/* CRUD operations */
// description - GET all contacts
// route - GET /api/contacts
// access - private
interface AuthenticatedRequest extends Request {
    user?: any;
}
export const getContacts = asyncHandler(async(req:AuthenticatedRequest,res:Response) => {
    const contacts = await contactModel.find({user_id: req.user.id});
    res.status(200).json({ // response containing json body
        success: true,
        contacts
    });
});

// description - GET single contact
// route - GET /api/contacts/:id
// access - private
export const getSingleContact = asyncHandler(async(req:AuthenticatedRequest,res:Response) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }

    res.status(200).json({ // response containing json body
        success: true,
        message: `The following Contact: ${req.params.id}`,
        contact,
    });
});
// description - Create a contact
// route - POST /api/contacts/
// access - private
export const createContact = asyncHandler(async(req:AuthenticatedRequest,res:Response) => {
    console.log(req.body);
    // destructuring the request body
    const {name,email,phone} = req.body;

    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are compulsory!");
    }

    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json({ // response containing json body
        success: true,
        message: `Contact created!`,
        contact,
    });
});
// description - Update a contact
// route - PUT /api/contacts/:id
// access - private
export const updateContact = asyncHandler(async(req:AuthenticatedRequest,res:Response) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403); //Not authorized
        throw new Error("User not authorized for this action!");
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true} // query option
    )

    res.status(201).json({ // response containing json body
        success: true,
        updatedContact,
    });
});

// description - Delete all contacts
// route - DELETE /api/contacts
// access - private
export const deleteContact = asyncHandler(async(req:AuthenticatedRequest,res:Response) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403); //Not authorized
        throw new Error("User not authorized for this action!");
    }

    await contactModel.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ // response containing json body
        success: true,
        message: `Deleted successfully! {${contact.name}, ${contact.email}, ${contact.phone}}`
    });
});