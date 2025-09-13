import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";   // ES Module import

const userSchema = new Schema({
    userName: { type: String },
    password: { type: String},
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
}, { 
    timestamps: true
});

// Pre-save hook for hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Custom method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
