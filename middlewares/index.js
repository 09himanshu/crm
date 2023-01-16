const {verifyJWT, isAdmin, ownerAcc,validate_tickets,check_correct_user} = require('./auth_jwt.middleware');
const {validateSignup,validate_SignIN} = require('./verify_SignUp.middleware');

module.exports = {
    verifyJWT: verifyJWT,
    validateSignup: validateSignup,
    validate_SignIN: validate_SignIN,
    isAdmin: isAdmin,
    ownerAcc: ownerAcc,
    validate_tickets: validate_tickets,
    check_correct_user: check_correct_user
}