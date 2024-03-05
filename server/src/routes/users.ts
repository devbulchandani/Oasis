import express, {Request, Response} from 'express';
import { register } from '../controllers/users';
import { registerValitor } from '../middleware/users';

const router = express.Router();

// /api/users/register 
router.post('/register',registerValitor, register)  

export default router;   