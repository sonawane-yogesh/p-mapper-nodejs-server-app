// import {
//     Schema
// } from "mongoose"
var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var emergencyContactSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    PhoneWork: {
        type: String,
        required: true
    },
    PhoneCell: {
        type: String,
        required: true
    },
    PhoneHome: {
        type: String,
        required: true
    },
    AlternatePhone: {
        type: String,
        required: true
    },
    ContactType: {
        type: String,
        required: true
    }
});

var appCardSchema = new Schema({
    AppTitle: {
        type: String,
        required: true
    },
    BusinessPurpose: {
        type: String,
        required: true
    },
    Version: {
        type: String,
        required: true
    },
    ServerName: {
        type: String,
        required: true
    },
    ServerIP: {
        type: String,
        required: true
    },
    Hardware: {
        type: String,
        required: true
    },
    OperatingSystem: {
        type: String,
        required: true
    },
    OsVersion: {
        type: String,
        required: true
    },
    // Dependancy: {
    //     type: Array
    // },
    CardType: {
        type: String,
        required: true
    },
    EmergencyContacts: [String],
    Tags: {
        type: [String],
        required: true
    }
});


var EmergencyContacts = server.model('EmergencyContacts', emergencyContactSchema, 'EmergencyContacts');
var ApplicationCardMaster = server.model('ApplicationCardMaster', appCardSchema, 'ApplicationCardMaster');
module.exports = {
    ApplicationCardMaster,
    EmergencyContacts
}