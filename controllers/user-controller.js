import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc    Register a user
//@route   POST /users/register
//@access  Public
export const registerUser = asyncHandler(async (req, resp) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        resp.status(400);
        throw new Error("All fields are required!");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        resp.status(400);
        throw new Error("User already registered!");
    }

    //hashpassword
    const hashedPassword = await bcrypt.hash(password, 10); //10 is salt rounds
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        resp.status(201).json({ _id: user.id, email: user.email });
    } else {
        resp.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc    Login user
//@route   POST /users/login
//@access  Public
export const loginUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400);
        throw new Error("All fields are required!");
    }

    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const access_token = jwt.sign(
            {
                //payload para inserir no token
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.JWT_TOKEN, //temos que prover um accesstokensecret
            { expiresIn: "15m" } //tempo de expiraçao do token
        );
        resp.status(200).json({ access_token });
    } else {
        resp.status(401);
        throw new Error("Email or password is not valid!");
    }
});

//@desc    Current user info
//@route   GET /users/current
//@access  Private
export const currentUser = asyncHandler(async (req, resp) => {
    resp.json(req.user); //user foi adicionado ao req em validateToken
});
