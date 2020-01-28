var { dbServer } = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var { IncidentMaster } = require('../model/incident-master');
var { UserMaster } = require('../model/user-master');
var Schema = mongoose.Schema;
var incidentStatusSchema = new Schema({
    IncidentId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    CurrentStatus: {
        type: String,
        required: true
    },
    StatusNotes: {
        type: String,
        required: true
    },
    UpdatedBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    UpdatedOn: {
        type: Date,
        default: Date.now,
        get: function (v) {
            return v.toLocaleDateString("en-us");
        }
    }
});

var incidentVirtual = {
    path: "IncidentMaster",
    value: {
        from: "IncidentMaster",
        localField: "IncidentId",
        foreignField: "_id",
        as: "IncidentMaster"
    },
    fields: ["IncidentTitle", "IncidentDetails"]
};

var userVirtual = {
    path: "UserMaster",
    value: {
        form: "UserMaster",
        localField: "UpdatedBy",
        foreignField: "_id",
        as: "UserMaster"
    },
    fields: ["FirstName", "LastName", "Username"]
};

incidentStatusSchema.virtual(incidentVirtual.path, incidentVirtual.value);
incidentStatusSchema.virtual(userVirtual.path, userVirtual.value);
incidentStatusSchema.pre("find", function (next) {
    this.populate(incidentVirtual.path, incidentVirtual.fields, IncidentMaster);
    this.populate(userVirtual.path, userVirtual.fields, UserMaster);
    next();
});

// incidentStatusSchema.pre("findOne", function (next) {
//     this.populate(incidentVirtual.path, incidentVirtual.fields, IncidentMaster);
//     this.populate(userVirtual.path, userVirtual.fields, UserMaster);
//     next();
// });

incidentStatusSchema.pre("aggregate", function (next) {
    this.lookup(incidentVirtual.value).unwind(incidentVirtual.path);
    next();
});
var IncidentStatuses = server.model("IncidentStatuses", incidentStatusSchema, "IncidentStatuses");
module.exports = { IncidentStatuses };
