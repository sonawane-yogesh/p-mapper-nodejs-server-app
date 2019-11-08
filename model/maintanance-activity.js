var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    ApplicationCardMaster
} = require("./application-card");
var {
    SystemMember
} = require("./system-members");

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
        ref: SystemMember
    }],
    StakeholderTeam: [],
    CurrentPhase: {
        type: String,
        required: true
    }
});

maintananceSchema.pre(["find", "findOne"], function (next) {
    this.populate("DevelopmentTeam");
    this.populate("ImpactedApps");
    next();
});

maintananceSchema.pre("aggregate", function (next) {
    this.lookup({
        from: "SystemMember",
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
    
    next();
});

var MaintananceActivity = server.model("MaintananceActivity", maintananceSchema, "MaintananceActivity");
module.exports = {
    MaintananceActivity
}