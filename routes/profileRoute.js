import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import {roleAuth} from '../middlewares/roleAuth.js';
import { User } from '../models/user.js';
import UserProfile from '../models/userProfile.js';

export const profileRoute = express.Router();

// GET Profile Route
profileRoute.get('/view', userAuth, roleAuth("admin", "recruiter", "user"), async (req, res) => {
  try{
    const user = req.user;
    const userId = user._id;

    // find user profile in DB
    const userProfile = await UserProfile.findOne({userId}).populate('userId', 'fullName email');
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    
    // return user profile data
    res.json({ data: userProfile });
  }
  catch(err){
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Edit Profile Route
profileRoute.patch('/edit', userAuth, roleAuth("admin", "recruiter", "user"), async (req, res) => {
  try{
    const user = req.user;
    const {fullName} = req.body;

    //validate req.body

    // find user in DB
    const userExists = await User.findById(user._id);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // update user data
    const updatedUser = await User.findByIdAndUpdate(user._id, {fullName : fullName});

    // save updated user
    await updatedUser.save();

    // return updated user data
    res.json({ data: updatedUser });
  }
  catch(err){
    res.status(500).json({ message: 'Failed to update profile' });
  }
});


// GET Profile by Id
profileRoute.get('/view/:id', userAuth, roleAuth("admin", "recruiter", "user"), async (req, res) => {
  try{
    const {id} = req.params;

    // find user in DB
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ data: userExists });
  }
  catch(err){
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});