import express from "express";
import { loginValidator, verifyToken } from "../middleware/auth";
import { login, logout } from "../controllers/auth";
import { Request, Response } from "express";

const router = express.Router();

router.post('/login', loginValidator, login)

router.get('/validate-token', verifyToken, (req : Request, res : Response) => {
    res.status(200).send({userId: req.userId})
})

router.post("/logout", logout)
export default router; 