import asyncHandler from "express-async-handler";
import Contact from "../models/contact-model.js";

//@desc    Get all contacts
//@route   GET /api/contacts
//@access  Public
export const getContacts = asyncHandler( async (req, resp) => {
    const contacts = await Contact.find();
    //status default é 200, nao precisa colocar
    resp.status(200).json(contacts);
});

//@desc    Create contact
//@route   POST /api/contacts
//@access  Public
export const createContact = asyncHandler( async (req, resp) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        resp.status(400);
        throw new Error("All fields are required!");
    }
    const contact = await Contact.create({
        name, email, phone
    });
    resp.status(201).json(contact);
});

//@desc    Update contact
//@route   PUT /api/contacts/:id
//@access  Public
export const updateContact = asyncHandler( async (req, resp) => {
    resp.status(201).json({message: "Contact updated"});
});

//@desc    Delete contact
//@route   DELETE /api/contacts/:id
//@access  Public
export const deleteContact = asyncHandler( async (req, resp) => {
    resp.status(201).json({message: "Contact deleted"});
});

//@desc    Get contact
//@route   GET /api/contacts/:id
//@access  Public
export const getContact = asyncHandler( async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        resp.status(404);
        throw new Error("Contact not found");
    }
    resp.status(200).json(contact);
});