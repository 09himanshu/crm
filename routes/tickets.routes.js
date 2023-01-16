

const Controller = require('../controllers/ticket.controller');
const jwt = require('../middlewares');

module.exports = (app) => {
    app.post('/crm/api/v1/create-tickets', [jwt.verifyJWT, jwt.validate_tickets], Controller.createTicket);
    app.get('/crm/api/v1/get_tickets', [jwt.verifyJWT], Controller.getAllTickets);
    app.patch('/crm/api/v1/update_ticket/:_id', [jwt.verifyJWT, jwt.check_correct_user], Controller.update_Tickets);
}