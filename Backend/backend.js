import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import authRoute from "./routes/auth.route.js"
import { connectDB } from "./utils/connectDB.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());//Middleware that allows us to parse incoming requests (basically serializer)

//This is where the app gets its address
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})
//Calling the routes/url
app.use("/api/auth", authRoute);