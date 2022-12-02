if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

module.exports = {
    port: process.env.port,
    jwt_secret: process.env.jwtsecret
}