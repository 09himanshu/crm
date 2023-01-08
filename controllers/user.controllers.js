const User = require('../models/user.models');
const {userTypes} = require('../utils/constant.utils')

// Get the list of all users
exports.findAll = async (req, res) => {
    try {
        let userType = req.query.userType;
        let userStatus = req.query.userStatus;
        let queryObj = {};
        if(userType) queryObj.userType = userType.toUpperCase();
        if(userStatus) queryObj.userStatus = userStatus.toUpperCase();
        let data = await User.find(queryObj, {name:1,user_id:1,email:1,userType:1,userStatus:1});
        res.status(200).send({status: true, message: 'success', total_data: data.length, data: data});
    } catch (err) {
        res.status(500).send({status: false, message: 'failure', data: err.message})
    }
}

// This method will return the user details
exports.findById = async (req, res) => {
    try {
        let user_id = req.params.id;
        let data = await User.findOne({user_id}, {name:1,user_id:1,email:1,userType:1,userStatus:1});
        if(!data) return res.status(404).send({status: false, message: 'success', data: {}});
        res.status(200).send({status: true, message: 'success', data});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'failure', data: `Internal server error occur ${err.message}`});
    }
}

// This method will update profile
exports.update = async (req, res) => {
    try {
        let body = req.body;
        let user_id = req.params.id;
        let check_usertype = await User.findOne({user_id: req.user_id});
        if(check_usertype.userType == userTypes.admin) {
            if(body.userStatus) body.userStatus = String(body.userStatus).toUpperCase();
            console.log('========================',body);
            await User.updateOne({user_id}, {$set: body});
        } else {
            let obj = {};
            if(body.name) obj.name = body.name;
            if(body.email) obj.email = body.email;
            await User.updateOne({user_id}, {$set: obj});
        }
        res.status(200).send({status: true, message: 'success', data: 'Profile updated'});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'failure', data: `Internal server error ${err.message}`});
    }
} 