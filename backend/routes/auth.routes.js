import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { register, login, getUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get('/user', protect, getUser);

export default router;