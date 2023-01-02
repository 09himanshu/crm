const jwt = require('jsonwebtoken');
const config = require('../config/server.config');
const User = require('../models/user.models');
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

module.exports = {verifyJWT, isAdmin}