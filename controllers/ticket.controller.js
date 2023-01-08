/**
 * Methods to create the logic of creating tickets
 * 1. Any auntheticated user should be able to create the tickets 
 *          -- Middleware should take care of this
 * 
 * 2. Ensure the request body has valid data
 *           -- Middleware 
 * 
 * 3. After the ticket is created, ensyre the users documents are also updated
 */

const User = require('../models/user.models');
const Ticket = require('../models/ticket.model');
const {userTypes, userStatus} = require('../utils/constant.utils');

exports.createTicket = async(req, res) => {
    // Read from the request body and cfeate the tickets object
    const ticketObj = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        reporter: req.user_id
    }

    try {
        // Find the Engineer avaliable and attach to the ticket object
        const engineer = await User.find({userType: userTypes.engineer, userStatus: userStatus.customer});
        let obj = {};
        if(engineer.length != 0) {
            let min = engineer[0].ticketAssigned.length;
            engineer.forEach(ele => {
                if(min < ele.ticketAssigned) {
                    min = ele.ticketAssigned.length;
                    obj.user_id = ele.user_id;
                }
            })
            ticketObj.assignee = obj.user_id
        }
        // Insert the ticket object in the users documents
        const ticket = await Ticket.create(ticketObj);
        if(ticket) {
            // await User.updateOne({user_id: req.user_id}, {$set: {ticketsCreated: {$push: }}} )
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'failure', data: `Internal server error ${err.message}`})
    }
}