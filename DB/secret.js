const mongoose = require('mongoose');

const index = require('./index');

const secretAPI = new mongoose.Schema({
    userID:{
        type:String
    },
    userSecret: {
        type:string
    }
});

module.exports = secret = mongoose.model('secret', secretAPI);