const Controller = require('../controllers/user.controllers');
const jwt = require('../middlewares');

module.exports = app => {
    app.get('/crm/api/v1/users', [jwt.verifyJWT, jwt.isAdmin], Controller.findAll);
    app.get('/crm/api/v1/usersdetails/:id', [jwt.verifyJWT, jwt.ownerAcc], Controller.findById);
    app.patch('/crm/api/v1/updateprofiles/:id', [jwt.verifyJWT, jwt.ownerAcc], Controller.update);
}