import mongoose, { mongo } from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone"]
    }
    },
    {
        timestamps: true
    }
);

// Step 2: Create the model
const Contact = mongoose.model('Contact', contactSchema);

// Step 3: Export the model
export default Contact;