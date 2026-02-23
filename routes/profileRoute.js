import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { roleAuth } from "../middlewares/roleAuth.js";
import { User } from "../models/user.js";
import UserProfile from "../models/userProfile.js";
import { RecruiterProfile } from "../models/recruiterProfile.js";

export const profileRoute = express.Router();

// GET Profile Route
profileRoute.get(
  "/view",
  userAuth,
  roleAuth("admin", "recruiter", "user"),
  async (req, res) => {
    try {
      const user = req.user;
      const userId = user._id;
      const role = user.role;

      // if user is a normal user, find user profile
      if (role === "user") {
        // find user profile in DB
        const userProfile = await UserProfile.findOne({ userId }).populate(
          "userId",
          "email",
        );
        if (!userProfile) {
          return res.status(404).json({ message: "User profile not found" });
        }

        res.json({ data: userProfile });
      }

      // if user is a recruiter, find recruiter profile
      if (role === "recruiter") {
        // find user profile in DB
        const recruiterProfile = await RecruiterProfile.findOne({
          recruiterId: userId,
        }).populate("recruiterId", "email");
        if (!recruiterProfile) {
          return res
            .status(404)
            .json({ message: "Recruiter profile not found" });
        }

        // return user profile data
        res.json({ data: recruiterProfile });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// Edit Profile Route
profileRoute.patch(
  "/edit",
  userAuth,
  roleAuth("admin", "recruiter", "user"),
  async (req, res) => {
    try {
      const user = req.user;

      // if user is a normal user, edit user profile
      if (user.role === "user") {
        // find user in DB
        const userExists = await UserProfile.findOne({ userId: user._id });
        if (!userExists) {
          return res.status(404).json({ message: "User not found" });
        }

        // update user data
        const updatedUser = await UserProfile.findOneAndUpdate(
          { userId: user._id },
          {
            $set: req.body,
          },
          { runValidators: true, new: true },
        );

        // save updated user
        await updatedUser.save();

        // return updated user data
        res.json({ data: updatedUser });
      }

      // if user is a recruiter, edit recruiter profile
      if (user.role === "recruiter") {
         // find user in DB
      const recruiterExists = await RecruiterProfile.findOne({ recruiterId: user._id });
      if (!recruiterExists) {
        return res.status(404).json({ message: "Recruiter not found" });
      }

      // update user data
      const updatedUser = await RecruiterProfile.findOneAndUpdate(
        { recruiterId: user._id },
        {
          $set: req.body,
        },
        { runValidators: true, new: true },
      );

      // save updated user
      await updatedUser.save();

      // return updated user data
      res.json({ data: updatedUser });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  },
);

// GET User Profile by Id
profileRoute.get(
  "/view/:id",
  userAuth,
  roleAuth("admin", "recruiter", "user"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // find user in DB
      const userExists = await UserProfile.findOne({ userId: id }).populate(
        "userId",
        "email",
      );
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ data: userExists });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  },
);
