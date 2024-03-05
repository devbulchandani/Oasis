import { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/User";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credintials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credintials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d",
            })

        res.cookie("auth token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 864000000
        })
        res.status(200).json({userId: user._id})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const logout = async (req: Request, res: Response) => {
    res.cookie("auth token", "", {
        expires : new Date(0)
    })
    res.send();
}