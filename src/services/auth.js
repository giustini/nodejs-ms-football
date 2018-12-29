'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user) {

    // Ref.: https://jwt.io/
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, config.secret);
}

function decodeToken(token) {

    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.secret);

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Token expired'
                })
            }

            resolve(payload.sub);

        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }
    })
}

module.exports = {
    createToken,
    decodeToken
};