'use strict';

const Player = require('../model/player');


function getPlayers(req, res) {

    Player.find({}, (err, players) => {

        if (err) return res.status(500).send({ message: "Error retrieving players from DB" });

        res.status(200).send({ players })
    });
}

function getPlayer(req, res) {

    let playerId = req.params.playerId;

    Player.findById(playerId, (err, player) => {

        if (err) res.status(500).send({ message: "Error retrieving player from DB" });
        if (!player) res.status(404).send({ message: "Player not found" });

        res.status(200).send({ player });
    });
}

function addPlayer(req, res) {

    let player = new Player();
    player.name = req.body.name;
    player.number = req.body.number;
    player.age = req.body.age;
    player.picture = req.body.picture;
    player.role = req.body.role;

    player.save((err, playerStored) => {

        if (err) res.status(500).send({ message: "Error saving player to DB" });

        res.status(201).send({ player: playerStored });
    });
}

function updatePlayer(req, res) {

    let playerId = req.params.playerId;

    let playerUpdated = req.body;

    Player.findByIdAndUpdate(playerId, playerUpdated, (err, player) => {

        if (err) res.status(500).send({ message: "Error updating player from DB" });

        res.status(200).send({ message: "Player updated", playerUpdated });
    });
}

function deletePlayer(req, res) {

    let playerId = req.params.playerId;

    Player.findById(playerId, (err, player) => {

        if (err) res.status(500).send({ message: "Error deleting player from DB" });

        player.remove(err => {
            if (err) res.status(500).send({ message: "Error deleting player from DB" });

            res.status(200).send({ message: "Player deleted from DB", player });
        })
    });
}

module.exports = {
    getPlayers,
    getPlayer,
    addPlayer,
    updatePlayer,
    deletePlayer
};