import express, {Response,Request} from "express";

// description - GET all contacts
// route - GET /api/contacts
// access - public
export const getContacts = (req:Request,res:Response) => {
    res.status(200).json({ // response containing json body
        success: true,
        message: "Welcome to your contacts!"
    });
};
// description - GET single contact
// route - GET /api/contacts/:id
// access - public
export const getSingleContact = (req:Request,res:Response) => {
    res.status(200).json({ // response containing json body
        success: true,
        message: `The following Contact: ${req.params.id}`
    });
};
// description - Create a contact
// route - POST /api/contacts/
// access - private
export const createContact = (req:Request,res:Response) => {
    console.log(req.body);
    res.status(201).json({ // response containing json body
        success: true,
        message: `Contact created: ${req.body.name} with mobile: ${req.body.phone}`
    });
};
// description - Update a contact
// route - PUT /api/contacts/:id
// access - private
export const updateContact = (req:Request,res:Response) => {
    res.status(201).json({ // response containing json body
        success: true,
        message: `Update Contact : ${req.params.id}`
    });
};
// description - Delete all contacts
// route - DELETE /api/contacts
// access - private
export const deleteContact = (req:Request,res:Response) => {
    res.status(200).json({ // response containing json body
        success: true,
        message: `Delete Contact: ${req.params.id}`
    });
};