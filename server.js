const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');

const config = require('./config/server.config');
const dbConfig = require('./config/db.config');
const User = require('./models/user.models');
const {userTypes} = require('./utils/constant.utils')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

// Db connection
mongoose.connect(dbConfig.mongo_url);
const db = mongoose.connection;
db.on('error', () => {
    console.log(`Error occur while connecting`);
})
db.once('open', () => {
    console.log(`Mongodb connected`);
    init();
})

// Create the Admin user at the boot time
async function init() {
    try {
        let user = await User.findOne({user_id: 'admin'});
        if(user) return console.log('Admin user is already present');
        user = await User.create({
            name: 'Himanshu',
            user_id: 'admin',
            password:  bcrypt.hashSync('09012001',10),
            email: 'admin123@gmail.com',
            userType: userTypes.admin,
        });
        console.log(user);
    } catch (err) {
        console.log(err);
    }
}

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/tickets.routes')(app);


app.listen(config.port, () => {
    console.log(`Server listen on port ${config.port}`);
});