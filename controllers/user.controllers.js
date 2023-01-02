const User = require('../models/user.models');

// Get the list of all users

exports.findAll = async (req, res) => {
    try {
        let data = await User.find({}, {name:1,user_id:1,email:1,userType:1,userStatus:1});
        res.status(200).send({status: true, message: 'success', data: data});
    } catch (err) {
        res.status(500).send({status: false, message: 'failure', data: err.message})
    }
}