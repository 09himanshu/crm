const mongoose = require('mongoose');
const {userStatus,userTypes} = require('../utils/constant.utils');
 
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
        default: userTypes.customer,
        enum: [userTypes.admin, userTypes.engineer, userTypes.customer]
    },
    userStatus: {
        type: String,
        require: true,
        default: userStatus.customer,
        enum: [userStatus.customer, userStatus.engineer, userStatus.admin]
    },
    ticketsCreated: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'ticket'
    },
    ticketAssigned: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'ticket'
    }
}, {versionKey: false});

module.exports = mongoose.model('user',User );