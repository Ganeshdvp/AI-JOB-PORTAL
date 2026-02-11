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
    role: {
        type: String,
        require: true,
        enum: ['admin', 'recruiter', 'user']
    }
    // profileImage:{
    //     type: String,
    //     require: true,
    //     default: "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80",
    // },
    // bgImage:{
    //     type: String,
    //     require: true,
    //     default: "https://www.creativefabrica.com/wp-content/uploads/2019/02/User-icon-EPS10-by-Kanggraphic.jpg",
    // },
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);