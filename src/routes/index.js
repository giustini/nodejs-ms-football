'use strict';

const express = require('express');
const router = express.Router();

const playersCtrl = require('../controllers/players');
const teamCtrl = require('../controllers/teams');
const userCtrl = require('../controllers/users');

const auth = require('../middlewares/auth');


router.get('/players', playersCtrl.getPlayers);
router.get('/players/:playerId', playersCtrl.getPlayer);
router.post('/players', auth, playersCtrl.addPlayer);
router.put('/players/:playerId', auth, playersCtrl.updatePlayer);
router.delete('/players/:playerId', auth, playersCtrl.deletePlayer);

router.get('/teams', teamCtrl.getTeams);
router.get('/teams/:teamId', teamCtrl.getTeam);
router.post('/teams', auth, teamCtrl.addTeam);
router.put('/teams/:teamId', auth, teamCtrl.updateTeam);
router.delete('/teams/:teamId', auth, teamCtrl.deleteTeam);

router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);

module.exports = router;