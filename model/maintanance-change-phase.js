var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    MaintenanceActivity,
    UserMaster,
    ApplicationCardMaster
} = require("./index");

// // This is for  Manitanace Activity Change phase
var maintanaceChangePhaseSchema = new Schema({
    MaintanaceActivityId: {
        type: mongoose.Types.ObjectId
    },
    CreatedOn: {
        type: Date,
        default: Date.now,
        get: function (v) {
            return v.toLocaleDateString("en-us");
        }
    },
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    },
    UpdatedOn: {
        type: Date,
        default: Date.now,
        get: function (v) {
            return v.toLocaleDateString("en-us");
        }
    },
    CurrentPhase: {
        type: String,
        required: true
    },
    ImpactedApps: [{
        type: mongoose.Types.ObjectId,
        ref: ApplicationCardMaster
    }],
    DevelopmentTeam: [{
        type: mongoose.Types.ObjectId,
        ref: UserMaster
    }],
    StakeholderTeam: [{
        type: mongoose.Types.ObjectId,
        ref: UserMaster
    }],
});


var maintanaceActivityVirtuals = {
    path: "MaintenanceActivity",
    value: {
        from: "MaintenanceActivity",
        localField: "MaintanaceActivityId",
        foreignField: "_id",
        as: "MaintenanceActivity"
    },
    fields: ["_id", "TicketTitle"]
};


var userMasterVirtuals = {
    path: "UserMaster",
    value: {
        from: "UserMaster",
        localField: "CreatedBy",
        foreignField: "_id",
        as: "UserMaster"
    },
    fields: ["_id", "FirstName", "LastName"]
};

maintanaceChangePhaseSchema.virtual(maintanaceActivityVirtuals.path, maintanaceActivityVirtuals.value);
maintanaceChangePhaseSchema.virtual(userMasterVirtuals.path, userMasterVirtuals.value);
maintanaceChangePhaseSchema.pre(["find", "findOne"], function (next) {
    var mSchema = this;
    mSchema.populate(maintanaceActivityVirtuals.path, maintanaceActivityVirtuals.fields, MaintenanceActivity);
    mSchema.populate(userMasterVirtuals.path, userMasterVirtuals.fields, UserMaster);
    next();
});

maintanaceChangePhaseSchema.pre("aggregate", function (next) {
    this.lookup({
        from: "UserMaster",
        foreignField: "_id",
        localField: "DevelopmentTeam",
        as: "DevelopmentTeam"
    });
    this.lookup({
        from: "ApplicationCardMaster",
        foreignField: "_id",
        localField: "ImpactedApps",
        as: "ImpactedApps"
    });
    this.lookup({
        from: "UserMaster",
        foreignField: "_id",
        localField: "StakeholderTeam",
        as: "StakeholderTeam"
    });
    this.lookup(maintanaceActivityVirtuals.value).unwind(maintanaceActivityVirtuals.path);
    this.lookup(userMasterVirtuals.value).unwind(userMasterVirtuals.path);
    next();
});

maintanaceChangePhaseSchema.set("toJSON", {
    virtuals: true,
    getters: true
});
maintanaceChangePhaseSchema.set('toObject', {
    virtuals: true,
    getters: true
});

var MaintanaceChangePhase = server.model("MaintanaceChangePhase", maintanaceChangePhaseSchema, "MaintanaceChangePhase")
module.exports = {
    MaintanaceChangePhase
}