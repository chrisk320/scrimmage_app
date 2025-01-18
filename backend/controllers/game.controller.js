import Game from '../models/game.model.js';
import axios from 'axios';
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

export const searchPark = async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ message: 'City is required to fetch parks' });
    }

    try {
        const API_KEY = process.env.MAPS_API_KEY;
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=parks+in+${city}&key=${API_KEY}`
        );

        const parks = response.data.results.map((park) => ({
            name: park.name,
            address: park.formatted_address,
            location: park.geometry?.location || null,
            placeId: park.place_id,
        }));
        res.status(200).json({ parks });
    } catch (error) {
        console.error('Error fetching parks:', error.message);
        res.status(500).json({ message: 'Error fetching parks. Please try again.' });
    }
}