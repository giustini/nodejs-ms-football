'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.send({message: "Hello world!"})
});

app.listen(port, () => {
    console.log(`Running API REST on http://localhost:${port}`);
});