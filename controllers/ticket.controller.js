/**
 * Methods to create the logic of creating tickets
 * 1. Any auntheticated user should be able to create the tickets 
 *          -- Middleware should take care of this
 * 
 * 2. Ensure the request body has valid data
 *           -- Middleware 
 * 
 * 3. After the ticket is created, ensyre the users documents are also updated
 * 
 * 4. Send the emali after the ticket is created to all the tickets holders
 */

const User = require('../models/user.models');
const Ticket = require('../models/ticket.model');
const {userTypes, userStatus} = require('../utils/constant.utils');
const sendEmail = require('../utils/notification_client')


exports.createTicket = async(req, res) => {
    // Read from the request body and cfeate the tickets object
    const ticketObj = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        reporter: req.user_id,
        status: req.body.status
    }

    const complainer = await User.findOne({user_id: req.user_id});

    try {
        // Find the Engineer avaliable and attach to the ticket object
        const engineer = await User.find({userType: userTypes.engineer, userStatus: userStatus.customer});
        let obj = {};
        if(engineer.length != 0) {
            let min = Infinity;
            engineer.forEach(ele => {
                if(ele.ticketAssigned.length < min) {
                    min = ele.ticketAssigned.length;
                    obj.user_id = ele.user_id;
                    obj.mail = ele.email;
                }
            })
            ticketObj.assignee = obj.user_id
        }
        // Insert the ticket object in the users documents
        const ticket = await Ticket.create(ticketObj);
        if(ticket) {
            await User.updateOne({user_id: req.user_id}, {$push: {ticketsCreated: ticket._id} } );
            if(engineer.length != 0) {
                await User.updateOne({user_id: obj.user_id}, {$push: {ticketAssigned: ticket._id} });
            }
        }

        //  Now we should send the notification request to notificationService
        sendEmail(`Ticket created with id: ${ticket._id}`, ticket.description, `${complainer.email},${obj.mail}`, 'CRM APP');

        res.status(201).send({status: true, message: 'success', data: ticketObj})
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'failure', data: `Internal server error ${err.message}`})
    }
}

exports.getAllTickets = async (req, res) => {
    try {
        const user = await User.findOne({user_id: req.user_id});
        let userobj = {};
        if(user.userType == userTypes.customer) {
            userobj = {_id: {$in: user.ticketsCreated} }
        } else if(user.userType == userTypes.engineer) {
            userobj = {$or: [{_id: {$in: user.ticketsCreated}}, {_id: {$in: user.ticketAssigned}}] }
        } else {
            userobj = {}
        }
        let tickets = await Ticket.find(userobj, {_id:1, title:1, ticketPriority:1, description: 1, reporter: 1});
        (tickets.length != 0) ? 
        res.status(200).send({status: true, message: `success`, data: tickets}) :
        res.status(200).send({status: true, message: `success`, data: `No tickets founds`});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'failure', data: `Internal server error ${err.message}`});
    }
}

exports.update_Tickets = async (req, res) => {
    let _id = req.params._id;
    try {
        const ticket = await Ticket.findOne({_id});
        let owner = await User.findOne({user_id: req.user_id});
        let assignee = await User.findOne({user_id: ticket.assignee});

        ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status;
        ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee;
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description;

        await ticket.save();

        //  Now we should send the notification request to notificationService
        sendEmail(`Ticket created with id: ${ticket._id}`, ticket.description, `${owner.email},${assignee.email}`, 'CRM APP');

        res.status(200).send({status: true, message: 'success', data: 'Ticket updated'});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: `failure`, data: `Internal server error ${err.message}`});
    }
} 