import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors";
import bodyParser from "body-parser"
import authRoute from "./routes/auth.route.js"
import { connectDB } from "./utils/connectDB.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
connectDB();

app.use(cors({origin: "http://localhost:5173", credentials:true }))

app.use(express.json());//Middleware that allows us to parse incoming requests (basically serializer)
app.use(cookieParser());

//This is where the app gets its address
app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
})
//Calling the routes/url
app.use("/api/auth", authRoute);