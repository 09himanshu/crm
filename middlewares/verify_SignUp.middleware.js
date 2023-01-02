const User = require('../models/user.models');
const {userTypes} = require('../utils/constant.utils');

const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

const validateSignup = async (req, res, next) => {
    // validate name
    if(!req.body.name) return res.status(400).send({status: false, message: `Name is missing`});

    // validate user_id
    if(!req.body.user_id) return res.status(400).send({status: false, message: `User_id is missing`});
    else {
        let user = await User.findOne({user_id: req.body.user_id});
        // console.log(user);
        if(user != null) return res.status(401).send({status: false, message: `user_id is already registered try other alphanumeric names`});
    }
    // validate email
    if(!req.body.email) return res.status(400).send({status: false, message: `Email is missing`});
    else {
        let mail = await User.findOne({email: req.body.email});
        if(mail) return res.status(400).send({status: false, message: `Email is already present`});
        if(!isValidEmail(req.body.email)) return res.status(400).send({status: false, message: `Invalid email`})
    }

    // validate password
    if(!req.body.password) return res.status(400).send({status: false, message: `Password is missing`});
    if(req.body.password.length < 6) return res.status(400).send({status: false, message: `Password should greater than 10 characters`});

    // validate usertype
    if(!req.body.userType) return res.status(400).send({status: false, message: `UserType is missing`});
    let arr = Object.values(userTypes);
 
    if(!arr.includes(req.body.userType.toUpperCase())) return res.status(400).send({status: false, message: `Invalid userType is provided !!!`});
    // if(arr.includes(req.body.userType.toUpperCase()) ) return res.status(400).send({status: false, message: `Invalid userType is provided !!!`});

    next();
}

const validate_SignIN = async (req, res, next) => {
    if(!req.body.user_id) return res.status(400).send({status: false, message: `User_id is missing`});
    if(!req.body.password) return res.status(400).send({status: false, message: `Password is missing`});
    next();
}

module.exports = { validateSignup, validate_SignIN }