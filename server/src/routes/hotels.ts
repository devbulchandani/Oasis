import express from 'express';
import { verifyToken } from '../middleware/auth';
import { getHotelById, searchHotel } from '../controllers/hotels';
import { getHotelIdValidator } from '../middleware/hotels';

const router = express.Router();

router.get('/search', searchHotel)
router.get('/:id',getHotelIdValidator, getHotelById)

export default router;