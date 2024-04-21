import { Request, Response } from "express"
import User from "../models/user";
import cloudinary from 'cloudinary';
import Hotel from "../models/hotel";
import { HotelType } from "../shared/type";

export const addHotel = async (req: Request, res: Response) => {
    console.log("addHotel function called")
    try {
        const pictures = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        // console.log("Request collected")

        // Upload images concurrently
        // console.log("Cloudinary upload started....")
        const imageUrls = await uploadImages(pictures);

        // Add image URLs to new Hotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        // console.log("new Hotel Created")

        // Save new hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();
        // console.log("New Hotel Saved")
        // Return success response
        res.status(201).send(hotel);
    } catch (err) {
        // console.log("Error creating hotel:", err);
        // Rollback any changes if needed
        // Handle errors more accurately
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const myHotels = async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({
            userId: req.userId
        })
        res.json(hotels)
    } catch (err) {
        console.log("Error fetching hotel:", err);
        res.status(500).json({ message: "Error fetching Hotels" })
    }
}

export const findHotel = async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        // console.log("Request: " + req)
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId
        });
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // console.log("Retrieved hotel:", hotel); // Log the retrieved hotel
        res.json(hotel)
    } catch (err) {
        console.log("Error editing hotel:", err);
        res.status(500).json({ message: "Error editing Hotel" })
    }
}

export const updateHotel = async (req: Request, res: Response) => {
    try {
        const updatedHotel: HotelType = req.body
        updatedHotel.lastUpdated = new Date()

        const hotel = await Hotel.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        }, updatedHotel,
            { new: true })

        if (!hotel) {
            return res.status(404).json({ message: "Hotel Not Found" })
        }

        const files = req.files as Express.Multer.File[];
        const UpdatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [...UpdatedImageUrls,
        ...(updatedHotel.imageUrls || [])
        ];

        await hotel.save();

        res.status(201).json(hotel)

    } catch (err) {
        console.log("Error updating hotel:", err);
        res.status(500).json({ message: "Error updating" })
    }
}


async function uploadImages(pictures: Express.Multer.File[]) {
    const uploadPromises = pictures.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(dataURI);
        return cloudinaryResponse.url;
    });
    // console.log("Cloudinary upload ended");


    const imageUrls = await Promise.all(uploadPromises);
    // console.log("Image urls stored");
    return imageUrls;
}

