import mongoose, { mongo } from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId, //pq o id veio do mongoose
            required: true,
            ref: "User", //vem da linha export default User in user-model.js
        },
        name: {
            type: String,
            required: [true, "Please add the contact name"],
        },
        email: {
            type: String,
            required: [true, "Please add the contact email"],
        },
        phone: {
            type: String,
            required: [true, "Please add the contact phone"],
        },
    },
    {
        timestamps: true,
    }
);

// Step 2: Create the model
const Contact = mongoose.model("Contact", contactSchema);

// Step 3: Export the model
export default Contact;
