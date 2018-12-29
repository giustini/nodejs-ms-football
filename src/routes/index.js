'use strict';

const express = require('express');
const router = express.Router();

const playersCtrl = require('../controllers/players');
const teamCtrl = require('../controllers/teams');
const userCtrl = require('../controllers/users');

const auth = require('../middlewares/auth');


router.get('/players', playersCtrl.getPlayers);
router.get('/players/:playerId', playersCtrl.getPlayer);
router.post('/players', playersCtrl.addPlayer);
router.put('/players/:playerId', playersCtrl.updatePlayer);
router.delete('/players/:playerId', playersCtrl.deletePlayer);

router.get('/teams', teamCtrl.getTeams);
router.get('/teams/:teamId', teamCtrl.getTeam);
router.post('/teams', teamCtrl.addTeam);
router.put('/teams/:teamId', teamCtrl.updateTeam);
router.delete('/teams/:teamId', teamCtrl.deleteTeam);

router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);

router.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Authorized' })
});

module.exports = router;