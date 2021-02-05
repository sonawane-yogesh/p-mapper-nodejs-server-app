var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    UserMaster,
    UserMasterSchema, JobCardMaster
} = require('../model/index');

// var emergencyContactSchema = new Schema({
//     Name: {
//         type: String,
//         required: true
//     },
//     Email: {
//         type: String,
//         required: true
//     },
//     PhoneWork: {
//         type: String,
//         required: true
//     },
//     PhoneCell: {
//         type: String,
//         required: true
//     },
//     PhoneHome: {
//         type: String,
//         required: true
//     },
//     AlternatePhone: {
//         type: String,
//         required: true
//     },
//     ContactType: {
//         type: String,
//         required: true
//     }
// });
var emergencyContactSchema = new Schema({
    Id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    ContactName: {
        type: String,
        default: null,
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
        ref: UserMaster
    }],
    Tags: {
        type: [String],
        required: true
    },
    SystemOwner: {
        type: String,
        required: false,
        default: ""
    },
    SystemManager: {
        type: String,
        required: false,
        default: ""
    },
    BusinessManager: {
        type: String,
        required: false,
        default: ""
    },
    BusinessOwner: {
        type: String,
        required: false,
        default: ""
    },
    CreatedOn: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    },
    UpdatedOn: {
        type: Date,
        default: Date.now
    },   
    JobCards: [{
        type: mongoose.Types.ObjectId,
        ref: JobCardMaster
    }],
});

var userMasterVirtuals = {
    path: "UserMaster",
    value: {
        from: "UserMaster",
        foreignField: "_id",
        localField: "EmergencyContacts",
        as: "UserMaster"
    },
    fields: ["_id", "FirstName", "LastName", "ContactTypeId"]
};
var jobCardVirtuals = {
    path: "JobCardMaster",
    value: {
        from: "JobCardMaster",
        foreignField: "_id",
        localField: "JobCards",
        as: "JobCardMaster"
    },
    fields: ["_id", "JobTitle"]
};

appCardSchema.virtual(userMasterVirtuals.path, userMasterVirtuals.value);
appCardSchema.virtual(jobCardVirtuals.path, jobCardVirtuals.value);

const findHook = function (next) {
    var appCards = this;
    appCards.populate(userMasterVirtuals.path, userMasterVirtuals.fields);
    appCards.populate(jobCardVirtuals.path, jobCardVirtuals.fields);
    // appCards.populate(userMasterVirtuals.path, userMasterVirtuals.fields, UserMaster);
    next();
};

appCardSchema.pre(["find", "findOne"], findHook);

appCardSchema.pre("aggregate", function (next) {
    this.lookup({
        from: 'AppDependencies',
        localField: '_id',
        foreignField: 'AppId',
        as: 'Dependencies'
    });
    this.lookup({
        from: 'JobCardMaster',
        localField: 'JobCards',
        foreignField: '_id',
        as: 'JobCardMaster'
    });
    this.lookup({
        from: 'UserMaster',
        localField: "EmergencyContacts",
        foreignField: "_id",
        as: "UserMaster"
    });
    next();
});

/*
appCardSchema.set('toJSON', {
    virtuals: true
});
appCardSchema.set('toObject', {
    virtuals: true,
    getters: true
});
*/
var EmergencyContacts = server.model('EmergencyContacts', emergencyContactSchema, 'EmergencyContacts');
var ApplicationCardMaster = server.model('ApplicationCardMaster', appCardSchema, 'ApplicationCardMaster');
module.exports = {
    ApplicationCardMaster,
    EmergencyContacts
}