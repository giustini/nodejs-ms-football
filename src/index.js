'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/players', (req, res) => {
    res.status(200).send({players: []})
});

app.get('/api/players/:playerId', (req, res) => {
    res.status(200).send({
        message: "Player created",
        player: {playerId: req.params.playerId}
    })
});

app.post('/api/players', (req, res) => {
    console.log(req.body);
    res.status(201).send(req.body)
});

app.put('/api/players/:playerId', (req, res) => {
    console.log(req.body);
    res.status(200).send({
        message: "Player updated",
        player: {playerId: req.params.playerId}
    })
});

app.delete('/api/players/:playerId', (req, res) => {
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Running API REST on http://localhost:${port}`);
});