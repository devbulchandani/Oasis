import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import myHotelRoutes from './routes/my-hotels'
import cookieParser from "cookie-parser";
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import hotelRoutes from './routes/hotels'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.COUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
}) 


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
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes)

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
})
app.listen(4001, () => {
    console.log("Server Port: 4001")
})  

