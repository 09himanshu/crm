const controller = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/crm/api/v1/signup', controller.signup);
    app.post('/crm/api/v1/signin', controller.signin);
}