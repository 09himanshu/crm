const User = require('../models/user.models');
const {userTypes} = require('../utils/constant.utils');


const validateSignup = async (req, res, next) => {
    // validate name
    if(!req.body.name) return res.status(400).send({status: false, message: `Name is missing`});

    // validate user_id
    if(!req.body.user_id) return res.status(400).send({status: false, message: `User_id is missing`});
    else {
        let user = User.findOne({user_id: req.body.user_id});
        if(user != null) return res.status(401).send({status: false, message: `user_id is already registered try other alphanumeric names`});
    }
    // validate email
    if(!req.body.email) return res.status(400).send({status: false, message: `Email is missing`});
    else {
        let mail = await User.findOne({email: req.body.email});
        if(mail) return res.status(400).send({status: false, message: `Email is already present`});
        let regex = new RegExp('[a-zA-z-09]+@gmail.com');
        if(!regex.test(req.body.email)) return res.status(400).send({status: false, message: `Enter a valid email`});
    }

    // validate password
    if(!req.body.password) return res.status(400).send({status: false, message: `Password is missing`});
    if(req.body.password.length < 6) return res.status(400).send({status: false, message: `Password should greater than 10 characters`});

    // validate usertype
    if(!req.body.userType) return res.status(400).send({status: false, message: `UserType is missing`});
    let arr = Object.values(userTypes);
    if(!arr.includes(req.body.userType)) return res.status(400).send({status: false, message: `Invalid userType is provided !!!`});
    
    next();
}

module.exports = { validateSignup }