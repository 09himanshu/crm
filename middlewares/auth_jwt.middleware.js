const jwt = require('jsonwebtoken');
const config = require('../config/server.config');
const User = require('../models/user.models');
const Ticket = require('../models/ticket.model');
const {userTypes} = require('../utils/constant.utils')

const verifyJWT = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token) return res.status(403).send({
        status: false.valueOf,
        messgae: 'failure',
        data: 'No token provided',
    });

    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if(err) return res.status(401).send({
            status: false,
            messgae: 'failure',
            data: `Unauthorized !`
        })
        req.user_id = decoded.id;
        next();
    })
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({user_id: req.user_id });
        if (user && user.userType == userTypes.admin) next() 
        else return res.status(400).send({
            status: false,
            messgae: 'failure',
            data: 'Only admin users are allowed to access this endpoint'
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            messgae: 'failure',
            data: 'Internal server error occur'+err.messgae
        })
    }
}

const ownerAcc = async (req, res, next) => {
    try {
        let data = await User.findOne({user_id: req.params.id});
        if(!data) return res.status(404).send({status: false, messgae: 'failure', data: `NO user found`});
        let token_user = await User.findOne({user_id: req.user_id});

        if(token_user.user_id == data.user_id) next();
        else if(token_user.userType == userTypes.admin) next();
        else return res.status(403).send({status: false, messgae: 'failure', data: `You are not eligible to access such data !!!`});
    } catch (err) {
        console.log(err);
        return res.status(500).send({status: false, messgae: 'failure', data: `Internal server error ${err.messgae}`});
    }
}

// ===================== Tickets validation
const validate_tickets = async(req, res, next) => {
    try {
        if(!req.body.title) return res.status(400).send({status: false, messgae: `title is not provided`});
        if(!req.body.description) return res.status(400).send({status: false, messgae: `Description is not provided`});
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send({status: false, messgae: 'failure', data: `Internal server error ${err.messgae}`});
    }
}

const check_correct_user = async (req, res, next) => {
    let _id = req.params._id;
    try {
        let user = await User.findOne({user_id: req.user_id});
        let check_engineer = await User.findOne({user_id: req.body.assignee});
        let ticket = await Ticket.findOne({_id});
    
        if(user.userType == userTypes.customer) {
            if(user.user_id != ticket.reporter) return res.status(403).send({status: false, messgae: 'failure', data: `Invalid user line 80`})
        } else if(user.userType == userTypes.engineer) {
            if(user.user_id != ticket.assignee) return res.status(403).send({status: false, messgae: 'failure', data: `Invalid user line 82`})
        }

        if(req.body.assignee != undefined && user.userType == userTypes.engineer) return res.status(403).send({status: false, messgae: 'failure', data: `Invalid user line 85`});
        else if(req.body.assignee != undefined && !check_engineer) return res.status(403).send({status: false, messgae: 'failure', data: `Invalid engineer id`});

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send({status:false, messgae: 'failure', data: `Internal server error`})
    }
}

module.exports = {verifyJWT, isAdmin, ownerAcc, validate_tickets,check_correct_user}