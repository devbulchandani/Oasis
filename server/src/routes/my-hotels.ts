import express from 'express';
import { addHotel, findHotel, myHotels, updateHotel } from '../controllers/my-hotels';
import multer from 'multer'
import { verifyToken } from '../middleware/auth';
import { newHotelValidator } from '../middleware/hotels';

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    }
})

const router = express.Router();

//api/my-hotels
router.post("/", verifyToken, newHotelValidator, upload.array("imageFiles", 6), addHotel)

router.get("/", verifyToken, myHotels)

router.get("/:id", verifyToken, findHotel)

router.put("/:hotelId", verifyToken, upload.array("imageFiles"), updateHotel)

export default router;