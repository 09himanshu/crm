/**
 * This file will contain the logic for thr registration of the user and login of the user
 * 
 * User types:
 *  1.CUSTOMER
 *      Registers and approved by default
 *      Should be able to login immediately
 * 
 *  2.ENGINEER
 *      Should be able to registered
 *      Intially he/she will be in PENDING state
 *      Admin should be able to approve this
 * 
 *  3.ADMIN
 *      
 */

/**
 *   Logic to accept the registeration
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const serverConfig = require('../config/server.config');

exports.signup = async (req, res) => {
    if(req.body.userType.toUpperCase() != 'customer'.toUpperCase()) {
        req.body.userStatus = 'pending'.toUpperCase();
    }
    const useObj = {
        name: req.body.name,
        user_id: req.body.user_id,
        email: req.body.email,
        userType: req.body.userType.toUpperCase(),
        password: bcrypt.hashSync(req.body.password, 10),
        userStatus: req.body.userStatus
    }
    try {
        let userCreated = await User.create(useObj);
        let response = {
            name: userCreated.name,
            user_id: userCreated.user_id,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createAt,
            updatedAt: userCreated.updateAt
        }
        res.status(201).send(response);
    } catch (err) {
        if(err) throw new Error(err)
        res.status(500).send({message: `Internal server error`});
    }
}

exports.signin = async (req, res) => {
    try {
        let user = await User.findOne({user_id: req.body.user_id});
        if(user == null) return res.status(404).send({message: `User doesn't exist`});

        let password = bcrypt.compareSync(req.body.password,user.password);
        if(!password) return res.status(401).send({message: `Invalid Password`});
        
        let token = jwt.sign({uu_id: user._id, id: user.user_id},serverConfig.jwt_secret, {
            expiresIn: 600
        });
        let response = {
            name: user.name,
            user_id: user.user_id,
            userType: user.userType,
            token: token
        }
        res.status(200).send({data: response})
    } catch (err) {
        console.log(err);
        res.status(500).send({message: `Error occur at ${err}`});
    }
}