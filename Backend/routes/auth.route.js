import express from "express"
import { login, logout, register, verifyEmail, forgotPassword, resetPassword } from "../controller/auth.controller.js";


const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);

route.post("/verify-email", verifyEmail);

route.post("/forgot-password", forgotPassword);
route.post("/reset-password/:token", resetPassword);

export default route;