'use strict';

const Team = require('../model/team');
const playersCtrl = require('../controllers/players');


function getTeams(req, res) {

    Team.find({}, (err, teams) => {

        if (err) return res.status(500).send({ message: "Error retrieving teams from DB" });

        res.status(200).send({ teams })
    });
}

function getTeam(req, res) {

    let teamId = req.params.teamId;

    Team.findById(teamId, (err, team) => {

        if (err) res.status(500).send({ message: "Error retrieving team from DB" });
        if (!team) res.status(404).send({ message: "Team not found" });

        res.status(200).send({ team });
    });
}

function addTeam(req, res) {

    let team = new Team();
    team.name = req.body.name;
    team.shieldPic = req.body.shieldPic;
    team.city = req.body.city;
    team.stadium = req.body.stadium;
    team.foundationYear = req.body.foundationYear;

    team.save((err, teamStored) => {

        if (err) res.status(500).send({ message: "Error saving team to DB" });

        res.status(201).send({ team: teamStored });
    });
}

function updateTeam(req, res) {

    let teamId = req.params.teamId;

    let teamUpdated = req.body;

    Team.findByIdAndUpdate(teamId, teamUpdated, (err, team) => {

        if (err) res.status(500).send({ message: "Error updating team from DB" });

        res.status(200).send({ message: "Team updated", teamUpdated });
    });
}

function deleteTeam(req, res) {

    let teamId = req.params.teamId;

    Team.findById(teamId, (err, team) => {

        if (err) res.status(500).send({ message: "Error deleting team from DB" });

        playersCtrl.deletePlayersByTeamId(teamId);

        team.remove(err => {
            if (err) res.status(500).send({ message: "Error deleting team from DB" });

            res.status(200).send({ message: "Team deleted from DB", team });
        })
    });
}

module.exports = {
    getTeams,
    getTeam,
    addTeam,
    updateTeam,
    deleteTeam
};