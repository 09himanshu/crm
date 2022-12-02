const mongoose = require('mongoose');
 
const User = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    createAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updateAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    userType: {
        type: String,
        require: true,
        default: 'COSTUMER'
    },
    userStatus: {
        type: String,
        require: true,
        default: 'APPROVED'
    }
});

module.exports = mongoose.model('user',User );