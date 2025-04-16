import {User} from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

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
}
export const login = (req,res) => {
    res.send("Register Route")
}
export const logout = (req,res) => {
    res.send("Register Route")
}

