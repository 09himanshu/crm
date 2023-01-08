const {verifyJWT, isAdmin, ownerAcc} = require('./auth_jwt.middleware');
const {validateSignup,validate_SignIN} = require('./verify_SignUp.middleware');

module.exports = {
    verifyJWT: verifyJWT,
    validateSignup: validateSignup,
    validate_SignIN: validate_SignIN,
    isAdmin: isAdmin,
    ownerAcc: ownerAcc
}