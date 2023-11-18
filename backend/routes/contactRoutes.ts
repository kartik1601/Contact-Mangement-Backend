import express, {Request,Response} from "express";
import {getContacts,createContact,updateContact,getSingleContact,deleteContact} from "../controllers/contact.controller";

const contactRouter = express.Router();

// get all contacts information
contactRouter.get('/', getContacts);
// get single contact information - :id - from database
contactRouter.get('/:id', getSingleContact);
// create a new contact
contactRouter.post('/', createContact);
// update contact - :id - from database
contactRouter.put('/:id', updateContact);
// delete a contact = :id - from database
contactRouter.delete('/:id', deleteContact);


export default contactRouter;