var {
    dbServer
} = require("../db/db-config");
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    ApplicationCardMaster
} = require('../model/application-card');
var {
    UserMaster
} = require('../model/user-master');

var incidentSchema = new Schema({
    IncidentTitle: {
        type: String
    },
    AssociatedApps: [{
        type: mongoose.Types.ObjectId,        
    }],
    Criticality: {
        type: String
    },
    IncidentDetails: {
        type: String
    },
    Resources: [{
        type: mongoose.Types.ObjectId
    }],
    Contact: {
        type: mongoose.Types.ObjectId
    },
    Status: {
        type: String
    },
    CreatedOn: {
        type: Date,
        default: Date.now
    },
    UpdatedOn: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        default: null
    }
});

var appsVirtual = {
    path: "ApplicationCardMaster",
    value: {
        from: "ApplicationCardMaster",
        foreignField: "_id",
        localField: "AssociatedApps",
        as: "ApplicationCardMaster"
    },
    fields: ["_id", "AppTitle"]
};

var resourceVirtual = {
    path: "UserMaster",
    value: {
        from: "UserMaster",
        foreignField: "_id",
        localField: "Resources",
        as: "UserMaster"
    },
    fields: ["_id", "FirstName", "LastName", "UserName"]
};

var contactVirtual = {
    path: "UserMaster",
    value: {
        from: "UserMaster",
        foreignField: "_id",
        localField: "Contact",
        as: "UserMaster"
    },
    fields: ["_id", "FirstName", "LastName", "UserName"]
};

incidentSchema.virtual(resourceVirtual.path, resourceVirtual.value);
incidentSchema.virtual(appsVirtual.path, appsVirtual.value);
incidentSchema.virtual(contactVirtual.path, contactVirtual.value);

incidentSchema.pre("find", function (next) {

    var incident = this;
    incident.populate(resourceVirtual.path, resourceVirtual.fields, UserMaster);
    incident.populate(appsVirtual.path, appsVirtual.fields, ApplicationCardMaster);
    incident.populate(contactVirtual.path, contactVirtual.fields, UserMaster);
    next();
});
incidentSchema.set('toJSON', {
    virtuals: true
})

incidentSchema.set('toObject', {
    virtuals: true,
    getters: true
})

exports.IncidentMaster = server.model("IncidentMaster", incidentSchema, "IncidentMaster");