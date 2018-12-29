'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');


const UserSchema = Schema({
    name: String,
    avatar: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    signUpDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UserSchema.pre('save', (next) => {

    let user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {

            if (err) return next(err);

            user.password = hash;

            next();
        })
    })
});

UserSchema.methods.gravatar = function () {
    return getGravatarURL(this.email);
};

function getGravatarURL(email) {

    let md5 = (email) ? crypto.createHash('md5').update(email).digest('hex') : "";

    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model('User', UserSchema);