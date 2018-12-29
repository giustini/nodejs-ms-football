'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    name: String,
    shieldPic: String,
    city: String,
    stadium: String,
    foundationYear: Number
});

module.exports = mongoose.model('Team', TeamSchema);