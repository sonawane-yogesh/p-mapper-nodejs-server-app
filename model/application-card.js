var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    SystemMember
} = require('../model/index');

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
    CardType: {
        type: String,
        required: true
    },
    EmergencyContacts: [{
        type: mongoose.Types.ObjectId,
        ref: SystemMember
    }],
    Tags: {
        type: [String],
        required: true
    },
    SystemOwner: {
        type: String,
        required: true
    },
    SystemManager: {
        type: String,
        required: true
    },
    BusinessManager: {
        type: String,
        required: true
    },
    BusinessOwner: {
        type: String,
        required: true
    }
});

appCardSchema.pre(["find", "findOne"], function (next) {
    this.populate("EmergencyContacts");
    next();
});

appCardSchema.pre("aggregate", function (next) {
    this.lookup({
        from: 'AppDependencies',
        localField: '_id',
        foreignField: 'AppId',
        as: 'Dependencies'
    });
    this.lookup({
        from: 'SystemMember',
        localField: "EmergencyContacts",
        foreignField: '_id',
        as: 'EmergencyContacts'
    });
    next();
});

var EmergencyContacts = server.model('EmergencyContacts', emergencyContactSchema, 'EmergencyContacts');
var ApplicationCardMaster = server.model('ApplicationCardMaster', appCardSchema, 'ApplicationCardMaster');
module.exports = {
    ApplicationCardMaster,
    EmergencyContacts
}