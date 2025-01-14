import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createGame, searchPark } from '../controllers/game.controller.js';

const router = express.Router();

router.post('/create', protect, createGame);

router.get('/parks', protect, searchPark);

export default router;