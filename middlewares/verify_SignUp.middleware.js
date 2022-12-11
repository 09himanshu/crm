const User = require('../models/user.models');


const validateSignup = async (req, res, next) => {
    // validate name
    if(!req.body.name) return res.status(400).send({message: `Name is missing`});

    // validate user_id
    if(!req.body.user_id) return res.status(400).send({message: `User_id is missing`});
    else {
        let user = User.findOne({user_id: req.body.user_id});
        if(user != null) return res.status(401).send({message: `user_id is already registered try other alphanumeric names`});
    }

    // validate email
    if(!req.body.email) return res.status(400).send({message: `Email is missing`});
    else {
        let mail = await User.findOne({email: req.body.email});
        if(mail) return res.status(400).send({message: `Email is already present`});
        let regex = new RegExp('[a-zA-z-09]+@gmail.com');
        if(!regex.test(req.body.email)) return res.status(400).send({message: `Enter a valid email`});
    }

    // validate password
    if(!req.body.password) return res.status(400).send({message: `Password is missing`});

    // validate usertype
    next();
}

module.exports = { validateSignup }