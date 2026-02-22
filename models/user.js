import mongoose from "mongoose";
import validator from 'validator';

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        require: true,
        minLength:4,
        maxLength:55
    },
    email:{
        type: String,
        require: true,
        unique: true,  // auto apply the index
        lowercase:true,
        trim: true,
        validator: {
            validator: (value)=>{
                if(!validator.isEmail(value)){
                    throw new Error(`${value} is not valid!`)
                }
            }
        }
    },
    password:{
        type: String,
        require: true,
        validator: {
            validator: (value)=>{
                if(!validator.isStrongPassword(value)){
                    throw new Error(`${value} is weak password!`)
                }
            }
        }
    },
    passwordChangedAt: {
    type: Date,
    default: null
    },
    role: {
        type: String,
        require: true,
        enum: ['admin', 'recruiter', 'user']
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);