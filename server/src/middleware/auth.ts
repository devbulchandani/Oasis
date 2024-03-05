import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const loginValidator = [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
]

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth token"]
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.userId = (decoded as JwtPayload).userId;
        next()
    } catch (err) {
        console.log(err)
        res.status(401).send({ message: "Unauthorized" })
    }
}