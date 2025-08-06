import asyncHandler from "express-async-handler";
import Contact from "../models/contact-model.js";

//@desc    Get all contacts from a user
//@route   GET /api/contacts
//@access  Private
export const getContacts = asyncHandler(async (req, resp) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    //status default é 200, nao precisa colocar
    resp.status(200).json(contacts);
});

//@desc    Get contact
//@route   GET /api/contacts/:id
//@access  Private
export const getContact = asyncHandler(async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error("Contact not found");
    }
    resp.status(200).json(contact);
});

//@desc    Create contact
//@route   POST /api/contacts
//@access  Private
export const createContact = asyncHandler(async (req, resp) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        resp.status(400);
        throw new Error("All fields are required!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id, //em validationToken req.user = decoded.user
    });
    resp.status(201).json(contact);
});

//@desc    Update contact
//@route   PUT /api/contacts/:id
//@access  Private
export const updateContact = asyncHandler(async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        resp.status(403);
        throw new Error("User dont have permission to update the user contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } //It tells Mongoose to return the updated document, not the old one (which is the default).
    );
    resp.status(200).json(updatedContact);
});

//@desc    Delete contact
//@route   DELETE /api/contacts/:id
//@access  Private
export const deleteContact = asyncHandler(async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error("Contact not found");
    }
    
    if (contact.user_id.toString() !== req.user.id) {
        resp.status(403);
        throw new Error("User dont have permission to delete the user contact");
    }
    
    await contact.deleteOne();
    resp.status(200).json({ message: "Contact deleted" });
});
