import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        city: { type: String, required: true },
        state: { type: String, required: true },
        park: { type: String, required: true },
        currentTeamNumber: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;