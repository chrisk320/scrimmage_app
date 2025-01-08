import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    skillLevel: { type: String, enum: ["Recreational", "High School", "College"], required: true},
    phoneNumber: { type: String, required: true }
    }, {
        timestamps: true
});

export default userSchema;