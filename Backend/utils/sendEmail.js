import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const sendVerificationEmail = async({ email, otp }, res) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Verify your email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully", info.messageId);
    } catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
}
