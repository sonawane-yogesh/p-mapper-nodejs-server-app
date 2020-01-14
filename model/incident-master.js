var {
    dbServer
} = require("../db/db-config");
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const uniqueRandom = require('unique-random');

var {
    ApplicationCardMaster
} = require('../model/application-card');
var {
    UserMaster
} = require('../model/user-master');

var incidentSchema = new Schema({
    IncidentTitle: {
        type: String,
        required: true
    },
    AssociatedApps: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    Criticality: {
        type: String,
        required: true
    },
    IncidentDetails: {
        type: String,
        required: true
    },
    Resources: [{
        type: mongoose.Types.ObjectId
    }],
    Contact: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    CreatedOn: {
        type: Date,
        default: Date.now,
        get: function (v) {
            return v.toLocaleDateString("en-us");
        }
    },
    UpdatedOn: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    IncidentNo: {
        type: String
    }
});

incidentSchema.methods.generateRandomNo = function (length) {
    var result = '';
    var characters = '01234567899876543210';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

incidentSchema.pre("save", function (next) {
    var no = this.generateRandomNo(8);
    this.IncidentNo = `PM-${no}`;
    next();
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
    path: "ContactMaster",
    value: {
        from: "UserMaster",
        foreignField: "_id",
        localField: "Contact",
        as: "ContactMaster"
    },
    fields: ["_id", "FirstName", "LastName", "UserName"]
};

incidentSchema.virtual(resourceVirtual.path, resourceVirtual.value);
incidentSchema.virtual(appsVirtual.path, appsVirtual.value);
incidentSchema.virtual("ContactMaster", contactVirtual.value);

incidentSchema.pre(["find", "findOne"], function (next) {
    var incident = this;
    incident.populate(resourceVirtual.path, resourceVirtual.fields, UserMaster);
    incident.populate(appsVirtual.path, appsVirtual.fields, ApplicationCardMaster);
    incident.populate(contactVirtual.path, contactVirtual.fields, UserMaster);
    next();
});

incidentSchema.pre("aggregate", function (next) {
    var incident = this;   
    // incident.lookup(appsVirtual.value); //.unwind(appsVirtual.path);
    next();
});

incidentSchema.set("toJSON", {
    getters: true,
    virtuals: true
});

incidentSchema.set("toObject", {
    getters: true,
    virtuals: true
})

exports.IncidentMaster = server.model("IncidentMaster", incidentSchema, "IncidentMaster");