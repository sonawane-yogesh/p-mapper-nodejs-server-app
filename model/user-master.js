var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Username: {
        type: String
    },
    Password: {
        type: String
    },
    ContactNo: {
        type: Number
    },
    EmailId: {
        type: String
    },
    Role: {
        type: String
    }
});

var UserMaster = server.model('UserMaster', userSchema, 'UserMaster');
module.exports = {
    UserMaster
};