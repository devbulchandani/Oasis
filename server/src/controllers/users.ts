import express, { Request, Response } from 'express';
import User from "../models/user";
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';


export const register = async (req: Request, res: Response) => {
    // console.log("function called")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }  
    try {
        let user = await User.findOne({
            email: req.body.email,
        }); 
        // console.log("Request body: ", req.body)

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        user = new User(req.body)
        await user.save();

        const token = jwt.sign({
            userId: user.id,
        },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: '1d',
            }
        );

        res.cookie("auth token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 864000000
        })

        res.status(200).send({message : "User registered successfully"});
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}