'use strict';

const express = require('express');
const router = express.Router();

const playerCtrl = require('../controllers/players')

router.get('/players', playerCtrl.getPlayers);
router.get('/players/:playerId', playerCtrl.getPlayer);
router.post('/players', playerCtrl.addPlayer);
router.put('/players/:playerId', playerCtrl.updatePlayer);
router.delete('/players/:playerId', playerCtrl.deletePlayer);

module.exports = router;