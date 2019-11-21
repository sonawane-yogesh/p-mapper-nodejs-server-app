var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    ApplicationCardMaster,
    UserMaster
} = require("../model/index");

var maintananceSchema = new Schema({
    AppName: {
        type: String,
        required: true
    },
    TicketTitle: {
        type: String,
        required: true
    },
    TicketNo: {
        type: String,
        required: true
    },
    AltRefNo: {
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
    CurrentPhase: {
        type: String,
        required: true
    },
    ApplicationId: {
        type: mongoose.Types.ObjectId
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
    UpdatedBy: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    },
    UpdatedOn: {
        type: Date,
        default: Date.now
    },
    Accomplishments: {
        type: String,
        required: false,
    },
    NextSteps: {
        type: String,
        required: false,
    },
    RisksAndMitigation: {
        type: String,
        required: false,
    },
    Issues: {
        type: String,
        required: false,
    },
    ActionItems: {
        type: String,
        required: false,
    }
});

var appMasterVirtuals = {
    path: "ApplicationCardMaster",
    value: {
        from: "ApplicationCardMaster",
        localField: "ApplicationId",
        foreignField: "_id",
        as: "ApplicationCardMaster"
    },
    fields: ["_id", "AppTitle"]
};
maintananceSchema.virtual(appMasterVirtuals.path, appMasterVirtuals.value);

maintananceSchema.pre(["find", "findOne"], function (next) {
    var mSchema = this;
    // this.populate("DevelopmentTeam");
    // this.populate("ImpactedApps");
    // this.populate("StakeholderTeam");
    mSchema.populate(appMasterVirtuals.path, appMasterVirtuals.fields, ApplicationCardMaster);
    
    next();
});

maintananceSchema.pre("aggregate", function (next) {    
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
    this.lookup(appMasterVirtuals.value).unwind(appMasterVirtuals.path);    
    next();
});

maintananceSchema.set("toJSON", {
    virtuals: true
});
maintananceSchema.set('toObject', {
    virtuals: true,
    getters: true
});

var MaintenanceActivity = server.model("MaintenanceActivity", maintananceSchema, "MaintenanceActivity");
module.exports = {
    MaintenanceActivity
};