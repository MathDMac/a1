import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase conectada")
    } catch (error) {
     console.log("Error no DB", error)   
    }
}