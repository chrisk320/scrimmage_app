import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const hash = await bcrypt.hash(this.password, 8);
        this.password = hash;
    }
    next();
})

const User = mongoose.model("User", userSchema);

export default User;