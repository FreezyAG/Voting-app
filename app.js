require('dotenv').config();
const express = require ('express');
const bodyParser = require ("body-parser");

const app = express();

// register database connection
const sequelize = require ('./src/util/database');
// const { sequelize } = require ('./src/models/index');
const errorMiddleware = require('./src/middleware/error');

//import models
const User = require ('./src/models/user');
const Ballot = require ('./src/models/ballot');

// import routes
const adminRoutes = require ('./src/routes/admin');
const authRoutes = require ('./src/routes/auth');
const voterRoutes = require('./src/routes/voter');

// register body-parser
app.use(bodyParser.json()); //application.json

//register routes
app.use('/admin', adminRoutes);
app.use( authRoutes );
app.use( voterRoutes );

//global error handler
app.use(errorMiddleware);

// Connection to the database
sequelize
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(process.env.PORT);
    })
    .then(() => {
        console.log('Connected to the database!')
    })
    .catch(err => {
        console.log('connection unsuccessful!', err)
    });
