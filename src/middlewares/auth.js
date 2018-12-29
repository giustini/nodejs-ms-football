'use strict';

const authServices = require('../services/auth');

function isAuth(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Forbidden' });
    }

    // Ignore 'Bearer'
    const token = req.headers.authorization.split(' ')[1];

    authServices.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        }).catch(response => {
        res.status(response.status);
    });
}

module.exports = isAuth;