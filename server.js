import express from 'express';
import dotenv from 'dotenv';
import { authRoute } from './routes/authRoute.js';
import { profileRoute } from './routes/profileRoute.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';


const app = express();
// enable .env variables
dotenv.config();
// convert json middleware
app.use(express.json());
// cookie read
app.use(cookieParser())




// Routes
app.use('/user', authRoute);
app.use('/profile', profileRoute);



// connect db and listen requests
connectDB().then(()=>{
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("Database connection failed", err);
})