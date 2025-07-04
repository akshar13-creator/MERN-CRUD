import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors"
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const startServer = async () =>{
  try{

    await mongoose.connect(MONGO_URL);
    console.log("Database is connected");
    app.listen(PORT,()=>{
      console.log(`Server is running on port ${PORT}`)
    })
  }catch(error){

    console.log("Database connection fail",error);
    
  }
}

startServer();

app.use("/api",route)