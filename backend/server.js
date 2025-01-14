import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import gameRoutes from './routes/game.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);

app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from frontend
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
      credentials: true,
    })
  );

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
});