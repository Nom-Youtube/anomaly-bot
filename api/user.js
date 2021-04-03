const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/secret');
const index = require('./index');
const route = express.Router();

function postCollection(userID, secretString) {
    route.post('/', async (req, res) => {
        const{secretString} = req.body;
        let secret = {};
        secretAPI.userID = secretString;
        secretAPI.secret = lastName;
        let userModel = new secret(secretAPI);
        await userModel.save();
        res.json(userModel);
    });
    
    module.exports = route;

}