import { Request, Response } from "express"
import User from "../models/user";
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from "../models/hotel";

export const addHotel = async (req: Request, res: Response) => {
    console.log("addHotel function called")
    try {
        const pictures = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        console.log("Request collected")

        // Upload images concurrently
        console.log("Cloudinary upload started....")
        const uploadPromises = pictures.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(dataURI);
            return cloudinaryResponse.url;
        });
        console.log("Cloudinary upload ended")


        const imageUrls = await Promise.all(uploadPromises);
        console.log("Image urls stored")

        // Add image URLs to new Hotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        console.log("new Hotel Created")

        // Save new hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();
        console.log("New Hotel Saved")
        // Return success response
        res.status(201).send(hotel);
    } catch (err) {
        console.log("Error creating hotel:", err);
        // Rollback any changes if needed
        // Handle errors more accurately
        res.status(500).json({ message: "Something went wrong" });
    }
};
