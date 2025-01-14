import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createGame } from '../controllers/game.controller.js';

const router = express.Router();

router.post('/create', protect, createGame);

export default router;