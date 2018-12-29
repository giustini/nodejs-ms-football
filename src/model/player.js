'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = Schema({
    name: String,
    number: Number,
    age: Number,
    picture: String,
    role: { type: String, enum: ['GK', 'DF', 'MF', 'AT'] },
    team: { type: Schema.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('Player', PlayerSchema);