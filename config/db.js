import mongoose from "mongoose";

export const connectDB = async ()=>{
    return await mongoose.connect(process.env.MONGODB_STRING);  // connection string
}