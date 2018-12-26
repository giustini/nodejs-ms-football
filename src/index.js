'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Player = require('./model/player');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/players', (req, res) => {
    Player.find({}, (err, players) => {

        if (err) return res.status(500).send({ message: "Error retrieving players from DB" });

        res.status(200).send({ players })
    })
});

app.get('/api/players/:playerId', (req, res) => {

    let playerId = req.params.playerId;

    Player.findById(playerId, (err, player) => {

        if (err) res.status(500).send({ message: "Error retrieving player from DB" });
        if (!player) res.status(404).send({ message: "Player not found" });

        res.status(200).send({ player });
    });

});

app.post('/api/players', (req, res) => {

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
});

app.put('/api/players/:playerId', (req, res) => {

    let playerId = req.params.playerId;

    let playerUpdated = req.body;

    Player.findByIdAndUpdate(playerId, playerUpdated, (err, player) => {

        if (err) res.status(500).send({ message: "Error updating player from DB" });

        res.status(200).send({ message: "Player updated", playerUpdated });
    });

});

app.delete('/api/players/:playerId', (req, res) => {

    let playerId = req.params.playerId;

    Player.findById(playerId, (err, player) => {

        if (err) res.status(500).send({ message: "Error deleting player from DB" });

        player.remove(err => {
            if (err) res.status(500).send({ message: "Error deleting player from DB" });

            res.status(200).send({ message: "Player deleted from DB", player });
        })
    });

});

mongoose.connect('mongodb://localhost:27017/football', {useNewUrlParser: true}, (err, res) => {

    if (err) return console.log("Error connecting to DB");

    console.log("DB connection is OK")
    app.listen(port, () => {
        console.log(`Running API REST on http://localhost:${port}`);
    });
});