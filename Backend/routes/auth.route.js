import express from "express"
import { login, logout, register, verifyEmail } from "../controller/auth.controller.js";


const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);

route.post("/verify-email", verifyEmail);

export default route;