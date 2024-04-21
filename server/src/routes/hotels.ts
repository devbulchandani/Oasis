import express from 'express';
import { verifyToken } from '../middleware/auth';
import { searchHotel } from '../controllers/hotels';

const router = express.Router();

router.get('/search', searchHotel )

export default router;