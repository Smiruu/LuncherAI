import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required : true
    },
    lasLogin: {
        type: Date,
        default: Date.now
    },
    isVerfied: {
        type:Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
},{timestamps: true});

export const User = mongoose.model("User", userSchema)