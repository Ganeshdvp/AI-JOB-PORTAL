import validator from 'validator';

export const RegisterVadlidation = (req)=>{
     const {fullName, email, password, role} = req;
    if(fullName < 4 || !fullName > 55){
        throw new Error('Name must be 4-55 characters');
    }
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('your password is weak!');
    }
    if(!["admin","recruiter", "user"].includes(role)){
        throw new Error('role is not valid!');
    }
}

export const LoginVadlidation = (email, password)=>{
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('your password is weak!');
    }
}