import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { RegisterVadlidation } from '../utils/validations.js';
import { LoginVadlidation } from '../utils/validations.js';
import jwt from 'jsonwebtoken';

export const authRoute = express.Router();

// register
authRoute.post('/register', async (req,res)=>{
    try{
        const {fullName, email, password, role} = req?.body;

        // validate info
        RegisterVadlidation(req.body);

        // find user db
        const isUserExists = await User.findOne({email});
        if(isUserExists) throw new Error('user is already exists!');

        // encrypt password
        const hashPassword = await bcrypt.hash(password, 10);

        // creating user model
        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
            role
        })
        await newUser.save();
        res.status(200).json({message: "Registration has been successful!", data: newUser})
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

// login
authRoute.post('/login', async (req,res)=>{
   try{
        const {email, password} = req?.body;

        // validations
        LoginVadlidation(email, password);

        // find user in db
        const user = await User.findOne({email});
        if(!user) throw new Error('user not found!');

        // compare passwords
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if(!isPasswordValid) throw new Error('invalid credentials!');

        // create jwt
        const token = jwt.sign({email}, process.env.JWT_SECRET_CODE, { expiresIn: '1d' });
        // store it in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path:'/'
        })

        // send response
        res.json({message: 'Login Successfull', data: user})
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

// logout
authRoute.post('/logout', async (req,res)=>{
  try{
    // cleanup token in cookie
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    // send response
    res.status(200).json({message: "logout successfully!"})
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})