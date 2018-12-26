'use strict';

const app = require('./app');
const config = require('./config');

const mongoose = require('mongoose');

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {

    if (err) return console.log("Error connecting to DB");

    console.log("DB connection is OK");

    app.listen(config.port, () => {
        console.log(`Running API REST on http://localhost:${config.port}`);
    });

});