import {User} from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';
import { sendPasswordResetEmail } from '../utils/sendEmail.js';

export const register = async (req,res) => {
    //variables that will be given by the user
    const{email, password, name} = req.body;

    try {
       if(!email || !password||!name){
        return res.status(400).json({ success: false, message: "All fields are required" });
       }

       const userAlreadyExists = await User.findOne({email});
       if(userAlreadyExists){
        return res.status(400).json({ success: false, message: "User already exists" });
       }
       //Encryption
       const hashedPassword = await bcrypt.hash(password,10);
       const verificationToken = generateVerificationToken();
       const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60* 60 * 1000 //24 hours
       })

       //jwt
       generateTokenAndSetCookie(res, user._id);

       await user.save();

       await sendVerificationEmail({email:user.email, otp: verificationToken})

       res.status(201).json({
        success: true,
        message: "User created succesfully",
        user: {
            ...user._doc, //getting all the fields
            password: undefined,
        },
       });

    } catch (error) {
        throw new Error(error.message);
    }
};

export const verifyEmail = async (req,res) => {
    const{code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })

        if(!user) {
            return res.status(400).json({success:false, message: "Invalid or expired verification code"})

        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();
        res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
    } catch (error) {
        console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
    }
};
export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();

        await user.save();

        res.status(200). json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password:undefined,
            },
        })
    } catch (error) {
        console.log("Error in login", error);
        return res.status(400).json({ success: false, message: error.message});
    }
};
export const logout = async (req,res) => {
    res.clearCookie("token")
    res.status(200).json({ success:true, message:"Logged out successfully"});
};

export const forgotPassword = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"Email not found"});
        }
        
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });

    }   catch (error) {
        console.log("Error in forgotPassword", error);
        return res.status(400).json({ success: false, message: error.message});
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfull",
        });
    } catch (error) {
        console.log("Error in resetPassword", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error("Check auth error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };


