const controller = require('../controllers/auth.controller');
const {validateSignup, validate_SignIN} = require('../middlewares/verify_SignUp.middleware')

module.exports = (app) => {
    app.post('/crm/api/v1/signup',[validateSignup], controller.signup);
    app.post('/crm/api/v1/signin',[validate_SignIN], controller.signin);
}