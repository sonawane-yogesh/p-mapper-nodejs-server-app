var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var maintananceSchema = new Schema({
    AppId: {
        type: mongoose.Types.ObjectId,
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
        AppName: {
            type: String,
            required: true
        },
        AppId: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    }],
    DevelopmentTeam: [{
        Name: String,
        MemberId: mongoose.Types.ObjectId
    }],
    StakeholderTeam: [{
        Name: String,
        MemberId: mongoose.Types.ObjectId
    }],
    CurrentPhase: {
        type: String,
        required: true
    }
});

var MaintananceActivity = server.model("MaintananceActivity", maintananceSchema, "MaintananceActivity");
module.exports = {
    MaintananceActivity
}