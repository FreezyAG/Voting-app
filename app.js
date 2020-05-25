require('dotenv').config();
const express = require ('express');
const bodyParser = require ("body-parser");

const app = express();

// register database connection
const sequelize = require ('./util/database');
const errorMiddleware = require('./middleware/error');

//import models
const User = require ('./models/user');
const Ballot = require ('./models/ballot');

// import routes
const adminRoutes = require ('./routes/admin');
const authRoutes = require ('./routes/auth');
const voterRoutes = require('./routes/voter');

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
