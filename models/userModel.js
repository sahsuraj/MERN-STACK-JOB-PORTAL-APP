import mongoose from 'mongoose';
import validator from 'validator';

//schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name Is Require']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email Is Required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password Is Required'],
        minlength: [6, 'Password length should be greater than 6 character']
    },
    location: {
        type: String,
        default: "India"
    },
},
    { timestamps: true })

export default mongoose.model('User', userSchema)