const mongoose = require('mongoose');
const {ticketStatus, userTypes} = require('../utils/constant.utils')

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    ticketPriority: {
        type: Number,
        required: true,
        default: 4
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: ticketStatus.open,
        enum: [ticketStatus.open,ticketStatus.closed,ticketStatus.blocked]
    },
    reporter: {
        type: String,
        required: true
    },
    assignee: {
        type: String
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
}, {versionKey: false});

module.exports = mongoose.model('ticket', ticketSchema); 