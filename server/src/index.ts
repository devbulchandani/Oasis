import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose'; 
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from "cookie-parser";
import path from 'path';

mongoose.connect(process.env.MONGO_URL as string).then(() => {
    console.log("Connected to database") 
})

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.static(path.join(__dirname, "../../client/dist")))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes);
app.listen(4001, ()=> {
    console.log("Server Port: 4001") 
}) 