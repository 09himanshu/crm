const Controller = require('../controllers/user.controllers');
const jwt = require('../middlewares');

module.exports = app => {
    app.get('/crm/api/v1/users', [jwt.verifyJWT, jwt.isAdmin], Controller.findAll);
}