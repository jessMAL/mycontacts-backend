import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please add the user email"],
        unique: [true, "Email address already exists"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
    },
    {
        timestamps: true
    }
);

// Step 2: Create the model
const User = mongoose.model('User', userSchema);

// Step 3: Export the model
export default User;