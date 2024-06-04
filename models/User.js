const mongoose = require('mongoose');
var validator = require('validator');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'invalid email address']
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})



exports.User = mongoose.model('User', UserSchema)