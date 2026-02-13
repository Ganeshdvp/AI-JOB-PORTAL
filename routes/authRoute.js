import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { RegisterVadlidation } from "../utils/validations.js";
import { LoginVadlidation } from "../utils/validations.js";
import jwt from "jsonwebtoken";
import userAuth from "../middlewares/userAuth.js";
import { roleAuth } from "../middlewares/roleAuth.js";
import {
  differenceInDays,
} from "date-fns";
import { sendEmail } from '../utils/sendEmail.js';


export const authRoute = express.Router();

// register
authRoute.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req?.body;

    // validate info
    RegisterVadlidation(req.body);

    // find user db
    const isUserExists = await User.findOne({ email });
    if (isUserExists) throw new Error("user is already exists!");

    // encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    // creating user model
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
      role,
      passwordChangedAt: new Date(),
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "Registration has been successful!", data: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// login
authRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req?.body;

    // validations
    LoginVadlidation(email, password);

    // find user in db
    const user = await User.findOne({ email });
    if (!user) throw new Error("user not found!");

    // compare passwords
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) throw new Error("invalid credentials!");

    // create jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_CODE, {
      expiresIn: "1d",
    });
    // store it in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    // send response
    res.json({ message: "Login Successfull", data: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// logout
authRoute.post(
  "/logout",
  userAuth,
  roleAuth("admin", "recruiter", "user"),
  async (req, res) => {
    try {
      // cleanup token in cookie
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      // send response
      res.status(200).json({ message: "logout successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

// change password
authRoute.post(
  "/change-password",
  userAuth,
  roleAuth("admin", "recruiter", "user"),
  async (req, res) => {
    try {
      const { password } = req?.body;
      const loggedInUser = req?.user;

      // restricted password modification
      if (loggedInUser.passwordChangedAt) {
        const days = differenceInDays(
          new Date(),
          loggedInUser?.passwordChangedAt,
        );
        if (days < 7) {
          throw new Error("You can change password only after 7 days");
        }
      }

      // encrypt password
      const hashPassword = await bcrypt.hash(password, 10);

      // replace new password on old password
      loggedInUser.password = hashPassword;
      loggedInUser.passwordChangedAt = new Date();

      await loggedInUser.save();
      res
        .status(200)
        .json({ message: "password has been updated successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);


// generate otp
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// send otp
authRoute.post('/send-otp', async (req,res)=>{
  try{
    const {email} = req?.body;

    // validate email
    const isUserExists = await User.findOne({email});
    if(!isUserExists) throw new Error("User not found!");

    // generate otp
    const otp = generateOTP();

    // create jwt token
    const token = jwt.sign({email,otp}, process.env.JWT_SECRET_CODE, {
      expiresIn: "5m"
    });

    // send otp to mail
    await sendEmail(email, otp);

    // send response
    res.status(200).json({message: 'OTP sent to mail successfully!', data: token})
  }
  catch(err){
    res.status(400).json({ message: err.message });
  }
})

// verify otp
authRoute.post('/verify-otp', async (req,res)=>{
  try{
    const {token, otp} = req?.body;

    // validate otp
    if(!token) throw new Error("Otp not found!");

    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
    if(!decoded) return res.status(400).json({ message: "Failed to verify otp!" });

    // checking otp
    if(decoded.otp !== otp) return res.status(400).json({ message: "Invalid OTP" })

    // send response
    res.status(200).json({message: 'Otp verified successfully!'})
  }
  catch(err){
    res.status(400).json({message: "OTP expired!"});
  }
})