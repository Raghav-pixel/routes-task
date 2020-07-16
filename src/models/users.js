const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    id: {
    type: Number
    },
    name: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
    },
    steps: {
        type: Number,
    },
    calories: {
        type: Number,
    }
    });

const User = mongoose.model('User', userSchema)

module.exports = User;