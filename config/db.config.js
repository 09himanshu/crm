if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

module.exports = {
    mongo_url: process.env.mongo_url
}