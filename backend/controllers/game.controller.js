import Game from '../models/game.model.js';
import { protect } from '../middleware/authMiddleware.js';

export const createGame = async (req, res) => {
    const { city, state, park, currentTeamNumber } = req.body;

    if (!city || !state || !park) {
        return res.status(400).json( { message: 'Please fill all required fields.' });
    }

    try {
        const game = new Game({
            createdBy: req.user._id,
            city,
            state,
            park,
            currentTeamNumber,
        });
        const savedGame = await game.save();
    } catch (error) {
        console.error('Error creating game:', error.message);
        res.status(500).json({ message: 'Serer error. Please try again later.' });
    }
};